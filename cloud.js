(()=>{"use strict";

const CFG_KEY="helios_cloud_config_v1";
const AUTH_KEY="helios_cloud_auth_v1";
const ROLE_KEY="helios_cloud_role_v1";
const VAPID_PUBLIC_KEY="BNjCO1NyXbOQ1sk6u1SyuK_-Sv-tk7Ic-If1KoHQmuSDfZySMp5RwpqFND3_v0O8_Cyg_UAyobfKifI_CkCLm1g";
let pollTimer=null;
let refreshPromise=null;

const state={
  config:null,
  auth:null,
  role:localStorage.getItem(ROLE_KEY)||"bobi",
  jobs:[],
  recoveryToken:anull
};

const BRANDS=["Ariston","Aux","Beko","Bosch","Carrier","Clivet","Cooper&Hunter","Daikin","Daitsu","Electrolux","Ferroli","Fox","Fujitsu","Fujitsu General","Galanz","Gorenje","Gree","Haier","Hisense","Hitachi","Hyundai","Kaisai","LG","Midea","Mitsubishi Electric","Mitsubishi Heavy","Olimpia Splendid","Panasonic","Samsung","Sharp","Sinclair","TCL","Tesla","Toshiba","Toshiba Carrier","VIVAX","VOX","York","Maxa","Orion","Tristar","Housel","Bergen","Vending","Favorit","Crown","Daewoo","Chigo","MDV","Whirlpool","Tadiran","Polar","Korel","Maxon","Hokkaido","Frozini","Eskimo"];

function cfg(){
  try{return JSON.parse(localStorage.getItem(CFG_KEY)||"null")}
  catch{return null}
}

function auth(){
  try{return JSON.parse(localStorage.getItem(AUTH_KEY)||"null")}
  catch{return null}
}

function saveAuth(a){
  state.auth=a;
  localStorage.setItem(AUTH_KEY,JSON.stringify(a));
}

function clearAuth(){
  state.auth=null;
  localStorage.removeItem(AUTH_KEY);
}

function esc(x){
  return String(x??"").replace(/[&<>"']/g,m=>({
    "&":"&amp;",
    "<":"&lt;",
    ">":"&gt;",
    '"':"&quot;",
    "'":"&#39;"
  }[m]));
}

function toast(x){
  alert(String(x??""));
}

function configured(){
  state.config=cfg();
  state.auth=auth();
  return !!(state.config?.url&&state.config?.anonKey);
}

/* API SA AUTOMATSKIM OBNAVLJANJEM TOKENA */

async function api(path,opts={},retried=false){

  if(!state.config)state.config=cfg();

  if(!state.config?.url||!state.config?.anonKey)
    throw Error("Cloud nije podešen");

  const h={
    apikey:state.config.anonKey,
    "Content-Type":"application/json",
    ...(opts.headers||{})
  };

  if(state.auth?.access_token){
    h.Authorization="Bearer "+state.auth.access_token;
  }

  const r=await fetch(
    state.config.url.replace(/\/$/,"")+path,
    {...opts,headers:h}
  );

  const txt=await r.text();
  let data;

  try{
    data=txt?JSON.parse(txt):null;
  }catch{
    data=txt;
  }

  if(!r.ok&&r.status===401&&!retried){
    const renewed=await refresh();

    if(renewed){
      return api(path,opts,true);
    }
  }

  if(!r.ok){
    throw Error(
      data?.msg||
      data?.message||
      data?.error_description||
      data?.error||
      txt||
      ("HTTP "+r.status)
    );
  }

  return data;
}

/* PRIJAVA */

async function login(email,password,team){

  const data=await api(
    "/auth/v1/token?grant_type=password",
    {
      method:"POST",
      body:JSON.stringify({email,password})
    }
  );

  saveAuth({
    ...data,
    team_code:team||data.user?.user_metadata?.team_code||""
  });

  return data;
}

/* REGISTRACIJA */

async function signup(email,password,team){

  const data=await api(
    "/auth/v1/signup",
    {
      method:"POST",
      body:JSON.stringify({
        email,
        password,
        data:{team_code:team}
      })
    }
  );

  if(data.access_token){
    saveAuth({...data,team_code:team});
  }

  return data;
}

/* AUTOMATSKO OSVEŽAVANJE SUPABASE TOKENA */

async function refresh(){

  if(refreshPromise)return refreshPromise;

  const oldAuth=state.auth||auth();

  if(!oldAuth?.refresh_token)return false;

  if(!state.config)state.config=cfg();

  if(!state.config?.url||!state.config?.anonKey)
    return false;

  refreshPromise=(async()=>{

    try{

      const r=await fetch(
        state.config.url.replace(/\/$/,"")+
        "/auth/v1/token?grant_type=refresh_token",
        {
          method:"POST",
          headers:{
            apikey:state.config.anonKey,
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            refresh_token:oldAuth.refresh_token
          })
        }
      );

      const txt=await r.text();
      let data;

      try{
        data=txt?JSON.parse(txt):null;
      }catch{
        data=txt;
      }

      if(!r.ok){
        console.error("Supabase refresh:",data);
        return false;
      }

      saveAuth({
        ...data,
        team_code:
          oldAuth.team_code||
          data.user?.user_metadata?.team_code||
          ""
      });

      return true;

    }catch(e){

      console.error("Refresh error:",e);
      return false;

    }finally{

      refreshPromise=null;

    }

  })();

  return refreshPromise;
}

function team(){
  return state.auth?.team_code||
    state.auth?.user?.user_metadata?.team_code||
    "";
}

/* SERVISNI NALOZI */

async function jobs(){

  const t=team();

  if(!t)throw Error("Nedostaje tim kod");

  return api(
    `/rest/v1/service_jobs?team_code=${encodeURIComponent("eq."+t)}&order=created_at.desc&limit=100`
  );
}

async function createJob(j){

  return api(
    "/rest/v1/service_jobs",
    {
      method:"POST",
      headers:{Prefer:"return=representation"},
      body:JSON.stringify({
        ...j,
        team_code:team(),
        created_by:state.auth?.user?.id||null
      })
    }
  );
}

async function updateJob(id,patch){

  return api(
    `/rest/v1/service_jobs?id=eq.${encodeURIComponent(id)}`,
    {
      method:"PATCH",
      headers:{Prefer:"return=representation"},
      body:JSON.stringify(patch)
    }
  );
}

async function deleteJob(id){

  if(!confirm("Da li sigurno želiš da obrišeš ovaj servisni nalog?"))
    return;

  try{

    await api(
      `/rest/v1/service_jobs?id=eq.${encodeURIComponent(id)}`,
      {method:"DELETE"}
    );

    toast("Servisni nalog je obrisan");

    await loadJobs();

  }catch(e){

    toast("Brisanje nije uspelo: "+e.message);

  }
}

function statusTag(s){

  const map={
    novo:"NOVO",
    preuzeto:"PREUZETO",
    zakazano:"ZAKAZANO",
    teren:"NA TERENU",
    zavrseno:"ZAVRŠENO",
    otkazano:"OTKAZANO"
  };

  return `<span class="cloudStatus s-${esc(s)}">${map[s]||esc(s)}</span>`;
}

/* CLOUD PODEŠAVANJE */

function setup(){

  document.getElementById("title").textContent="Ana ↔ Bobi";

  document.getElementById("screen").innerHTML=`
    <div class="section">
      <div class="card">
        <h2>Cloud podešavanje</h2>
        <p class="muted">Ovo povezuje Anin i Bobijev telefon preko Supabase-a. Lokalni podaci ostaju sačuvani.</p>

        <div class="field">
          <label>Supabase Project URL</label>
          <input id="c_url" placeholder="https://xxxx.supabase.co" value="${esc(state.config?.url||"")}">
        </div>

        <div class="field">
          <label>Supabase anon key</label>
          <textarea id="c_key" rows="3" placeholder="eyJ...">${esc(state.config?.anonKey||"")}</textarea>
        </div>

        <button class="btn primary" onclick="cloudSaveConfig()">Sačuvaj cloud podešavanje</button>

        <p class="hint">Koristi samo javni anon ključ. Nikad ne stavljaj service-role ključ u aplikaciju.</p>
      </div>
    </div>
  `;
}

/* EKRAN ZA PRIJAVU */

function authScreen(){

  stopPoll();

  document.getElementById("title").textContent="Ana ↔ Bobi";

  document.getElementById("screen").innerHTML=`
    <div class="section">

      <div class="card">
        <h2>Helios dispečer</h2>

        <p class="muted">Jedan nalog za Anu, jedan za Bobija. Oboje koristite isti tim kod.</p>

        <div class="field">
          <label>Email</label>
          <input id="cl_email" type="email" autocomplete="username">
        </div>

        <div class="field">
          <label>Lozinka</label>
          <input id="cl_pass" type="password" autocomplete="current-password">
        </div>

        <div class="field">
          <label>Tim kod</label>
          <input id="cl_team" value="HELIOS-BOBI-ANA" autocomplete="off">
        </div>

        <div class="row">
          <button class="btn primary" onclick="cloudLogin()">Prijavi se</button>
          <button class="btn" onclick="cloudSignup()">Napravi nalog</button>
        </div>

        <p class="hint">Ako je uključena potvrda emaila u Supabase-u, prvo potvrdi email.</p>
      </div>

      <div class="card">
        <button class="btn" onclick="cloudSetup()">⚙️ Cloud podešavanje</button>
      </div>

    </div>
  `;
}

/* MARKE KLIMA */

function brandOptions(){

  return `<option value="">Izaberi marku</option>`+
    BRANDS.map(b=>`<option value="${esc(b)}">${esc(b)}</option>`).join("");
}

/* GLAVNI EKRAN */

function dashboard(){

  document.getElementById("title").textContent=
    state.role==="ana"?"Ana — Dispečer":"Bobi — Novi servisi";

  const isAna=state.role==="ana";

  document.getElementById("screen").innerHTML=`
    <div class="section">

      <div class="row">
        <button class="btn ${isAna?"primary":""}" onclick="cloudRole('ana')">Ana</button>
        <button class="btn ${!isAna?"primary":""}" onclick="cloudRole('bobi')">Bobi</button>
        <button class="btn" onclick="cloudRefresh()">↻ Osveži</button>
        <button class="btn" onclick="cloudLogout()">Odjava</button>
      </div>

      ${isAna?anaForm():bobiPanel()}

      <div id="cloudJobs"></div>

    </div>
  `;

  drawJobs();
  startPoll();
}

/* ANIN OBRAZAC */

function anaForm(){

  return `
    <div class="card">

      <h2>+ Novi servis</h2>

      <div class="field">
        <label>Ime i prezime</label>
        <input id="j_name">
      </div>

      <div class="two">

        <div class="field">
          <label>Telefon</label>
          <input id="j_phone" inputmode="tel">
        </div>

        <div class="field">
          <label>Željeni datum</label>
          <input id="j_date" type="date">
        </div>

      </div>

      <div class="field">
        <label>Adresa</label>
        <input id="j_address">
      </div>

      <div class="field">
        <label>Lokacija / Google Maps link</label>
        <input id="j_maps" placeholder="Po želji nalepi link ili adresu">
      </div>

      <div class="two">

        <div class="field">
          <label>Marka</label>
          <select id="j_brand">${brandOptions()}</select>
        </div>

        <div class="field">
          <label>Model</label>
          <input id="j_model" placeholder="Unesi tačan model sa nalepnice">
        </div>

      </div>

      <div class="field">
        <label>Problem</label>
        <textarea id="j_symptom" placeholder="Ne hladi, curi voda, ne pali..."></textarea>
      </div>

      <div class="field">
        <label>Napomena</label>
        <textarea id="j_note"></textarea>
      </div>

      <div class="field">
        <label>Fotografija</label>
        <input id="j_photo" type="file" accept="image/*" capture="environment" onchange="cloudPhoto(this)">
        <div id="j_photo_prev"></div>
      </div>

      <button class="btn primary" onclick="cloudCreateJob()">📤 POŠALJI SERVIS</button>

    </div>
  `;
}

/* BOBIJEV PANEL */

function bobiPanel(){

  return `
    <div class="card">

      <h2>Novi servisi</h2>

      <p class="muted">Kada Ana pošalje nalog, pojaviće se ovde. Status se menja na svim uređajima.</p>

      <div class="row">
        <button class="btn primary" onclick="cloudNotify()">🔔 Dozvoli obaveštenja</button>
      </div>

    </div>
  `;
}

/* PRIKAZ SERVISA */

function drawJobs(){

  const el=document.getElementById("cloudJobs");

  if(!el)return;

  const a=state.jobs||[];

  el.innerHTML=a.length?`
    <div class="cloudList">

      ${a.map(j=>`

        <div class="card cloudJob">

          <div class="split">

            <div>
              <b>${esc(j.name)}</b>
              <small>${esc(j.phone||"")} · ${esc(j.address||"")}</small>
            </div>

            ${statusTag(j.status)}

          </div>

          <p><b>${esc(j.brand||"")} ${esc(j.model||"")}</b></p>

          <p>${esc(j.symptom||"")}</p>

          ${j.note?`<p class="muted">${esc(j.note)}</p>`:""}

          ${j.maps_url?`
            <a class="btn small" href="${esc(j.maps_url)}" target="_blank" rel="noopener">🗺️ Mapa</a>
          `:""}

          <div class="row" style="margin-top:10px">

            ${state.role==="bobi"?`

              <button class="btn" onclick="cloudStatus('${j.id}','preuzeto')">Preuzeto</button>

              <button class="btn" onclick="cloudStatus('${j.id}','teren')">Na terenu</button>

              <button class="btn primary" onclick="cloudStatus('${j.id}','zavrseno')">Završeno</button>

              <button class="btn" onclick="cloudImport('${j.id}')">Dodaj u Korisnike</button>

            `:`

              <button class="btn" onclick="cloudStatus('${j.id}','otkazano')">Otkaži</button>

              <button class="btn" onclick="cloudStatus('${j.id}','zakazano')">Zakazano</button>

            `}

            <button class="btn" onclick="cloudDeleteJob('${j.id}')">🗑 Obriši</button>

          </div>

        </div>

      `).join("")}

    </div>
  `:`
    <div class="empty">Nema servisa.</div>
  `;
}

/* UČITAVANJE NALOGA */

async function loadJobs(){

  try{

    if(!configured()){
      setup();
      return;
    }

    if(!state.auth){
      authScreen();
      return;
    }

    state.jobs=await jobs();

    drawJobs();

  }catch(e){

    toast("Cloud: "+e.message);

  }
}

/* KREIRANJE SERVISA + PUSH OBAVEŠTENJE */

async function cloudCreateJob(){

  try{

    const j={

      name:document.getElementById("j_name").value.trim(),

      phone:document.getElementById("j_phone").value.trim(),

      address:document.getElementById("j_address").value.trim(),

      maps_url:document.getElementById("j_maps").value.trim(),

      brand:document.getElementById("j_brand").value,

      model:document.getElementById("j_model").value.trim(),

      symptom:document.getElementById("j_symptom").value.trim(),

      note:document.getElementById("j_note").value.trim(),

      scheduled_date:document.getElementById("j_date").value||null,

      photo:window._heliosCloudPhoto||null,

      status:"novo"

    };

    if(!j.name||!j.phone)
      return toast("Unesi ime i telefon");

    // Prvo se servis sigurno upisuje u bazu.
    const created=await createJob(j);
    const newJob=Array.isArray(created)?created[0]:created;

    window._heliosCloudPhoto=null;

    // Zatim se traži slanje Push obaveštenja Bobijevim uređajima.
    let pushMessage="";

    if(newJob?.id){

      try{

        const pushResponse=await fetch(
          state.config.url.replace(/\/$/,"")+"/functions/v1/send-push",
          {
            method:"POST",
            headers:{
              apikey:state.config.anonKey,
              Authorization:"Bearer "+state.auth.access_token,
              "Content-Type":"application/json"
            },
            body:JSON.stringify({job_id:newJob.id})
          }
        );

        const pushText=await pushResponse.text();
        let pushData;

        try{
          pushData=pushText?JSON.parse(pushText):null;
        }catch{
          pushData={message:pushText};
        }

        if(!pushResponse.ok){
          console.error("Push slanje nije uspelo:",pushData);
          pushMessage=" Servis je sačuvan, ali Push obaveštenje nije poslato: "+
            (pushData?.error||pushData?.message||"HTTP "+pushResponse.status);
        }else if(Number(pushData?.sent||0)===0){
          pushMessage=" Servis je sačuvan, ali Bobijev uređaj još nije registrovan za Push.";
        }

      }catch(pushError){

        console.error("Push mrežna greška:",pushError);
        pushMessage=" Servis je sačuvan, ali slanje obaveštenja nije uspelo.";

      }

    }else{

      pushMessage=" Servis je sačuvan, ali server nije vratio ID naloga za Push.";

    }

    toast("Servis poslat Bobiju."+pushMessage);

    await loadJobs();

  }catch(e){

    toast("Slanje nije uspelo: "+e.message);

  }
}

/* PROMENA STATUSA */

async function cloudStatus(id,status){

  try{

    await updateJob(id,{
      status,
      updated_at:new Date().toISOString()
    });

    await loadJobs();

  }catch(e){

    toast("Status nije promenjen: "+e.message);

  }
}

/* DODAVANJE U KORISNIKE */

async function cloudImport(id){

  const j=state.jobs.find(x=>x.id===id);

  if(!j||!window.heliosNewCustomerFromCloud)
    return;

  await window.heliosNewCustomerFromCloud(j);

  toast("Servis dodat u Korisnike");
}

/* FOTOGRAFIJE */

async function cloudPhoto(inp){

  const f=inp.files?.[0];

  if(!f)return;

  try{

    window._heliosCloudPhoto=await resizeCloud(f);

    document.getElementById("j_photo_prev").innerHTML=`
      <img style="max-width:180px;border-radius:10px;margin-top:8px" src="${window._heliosCloudPhoto}">
    `;

  }catch(e){

    toast("Fotografija nije učitana");

  }
}

function resizeCloud(file){

  return new Promise((res,rej)=>{

    const r=new FileReader();

    r.onload=()=>{

      const img=new Image();

      img.onload=()=>{

        const max=1200;

        const scale=Math.min(1,max/Math.max(img.width,img.height));

        const c=document.createElement("canvas");

        c.width=Math.round(img.width*scale);
        c.height=Math.round(img.height*scale);

        c.getContext("2d").drawImage(img,0,0,c.width,c.height);

        res(c.toDataURL("image/jpeg",.72));

      };

      img.onerror=rej;
      img.src=r.result;

    };

    r.onerror=rej;
    r.readAsDataURL(file);

  });
}

/* ČUVANJE CLOUD PODEŠAVANJA */

function cloudSaveConfig(){

  const url=document.getElementById("c_url").value.trim();

  const anonKey=document.getElementById("c_key").value.trim();

  if(!url||!anonKey)
    return toast("Unesi oba podatka");

  localStorage.setItem(
    CFG_KEY,
    JSON.stringify({url,anonKey})
  );

  state.config={url,anonKey};

  toast("Cloud podešavanje sačuvano");

  cloudScreen();
}

/* PROMENA LOZINKE */

function recoveryScreen(token){

  state.recoveryToken=token;

  document.getElementById("title").textContent="Promena lozinke";

  document.getElementById("screen").innerHTML=`

    <div class="section">

      <div class="card">

        <h2>Nova lozinka</h2>

        <p class="muted">Unesi novu lozinku dva puta.</p>

        <div class="field">
          <label>Nova lozinka</label>
          <input id="new_pass" type="password" autocomplete="new-password">
        </div>

        <div class="field">
          <label>Ponovi novu lozinku</label>
          <input id="new_pass2" type="password" autocomplete="new-password">
        </div>

        <button class="btn primary" onclick="cloudSetPassword()">Sačuvaj novu lozinku</button>

      </div>

    </div>

  `;

  window.cloudSetPassword=async()=>{

    const p=document.getElementById("new_pass").value;

    const p2=document.getElementById("new_pass2").value;

    if(p.length<6)
      return toast("Lozinka mora imati najmanje 6 karaktera");

    if(p!==p2)
      return toast("Lozinke se ne poklapaju");

    try{

      const r=await fetch(
        state.config.url.replace(/\/$/,"")+"/auth/v1/user",
        {
          method:"PUT",
          headers:{
            apikey:state.config.anonKey,
            Authorization:"Bearer "+state.recoveryToken,
            "Content-Type":"application/json"
          },
          body:JSON.stringify({password:p})
        }
      );

      const txt=await r.text();

      let d;

      try{d=txt?JSON.parse(txt):null}
      catch{d=txt}

      if(!r.ok)
        throw Error(d?.message||d?.msg||d?.error_description||d?.error||txt);

      state.recoveryToken=null;

      history.replaceState(null,"",location.pathname+location.search);

      authScreen();

      toast("Lozinka je promenjena. Prijavi se novom lozinkom.");

    }catch(e){

      toast("Promena lozinke: "+e.message);

    }

  };
}

/* POTVRDA PRIJAVE PREKO EMAIL LINKA */

async function consumeAuthHash(){

  const hash=new URLSearchParams(location.hash.replace(/^#/,""));

  const access=hash.get("access_token");

  if(!access)return false;

  const type=hash.get("type");

  if(type==="recovery"){
    recoveryScreen(access);
    return true;
  }

  try{

    state.config=cfg();

    if(!state.config?.url||!state.config?.anonKey){
      authScreen();
      return true;
    }

    const r=await fetch(
      state.config.url.replace(/\/$/,"")+"/auth/v1/user",
      {
        headers:{
          apikey:state.config.anonKey,
          Authorization:"Bearer "+access
        }
      }
    );

    const txt=await r.text();

    let user;

    try{user=txt?JSON.parse(txt):null}
    catch{user=null}

    if(!r.ok)
      throw Error(user?.message||user?.msg||"Sesija nije potvrđena");

    saveAuth({

      access_token:access,

      refresh_token:hash.get("refresh_token")||"",

      expires_in:Number(hash.get("expires_in")||3600),

      expires_at:hash.get("expires_at")?
        Number(hash.get("expires_at")):
        Math.floor(Date.now()/1000)+Number(hash.get("expires_in")||3600),

      token_type:hash.get("token_type")||"bearer",

      user,

      team_code:user?.user_metadata?.team_code||""

    });

    history.replaceState(null,"",location.pathname+location.search);

    dashboard();

    await loadJobs();

    return true;

  }catch(e){

    history.replaceState(null,"",location.pathname+location.search);

    toast("Sesija: "+e.message);

    authScreen();

    return true;

  }
}

/* POKRETANJE CLOUD-A */

async function cloudScreen(){

  if(!configured())
    return setup();

  if(await consumeAuthHash())
    return;

  if(!state.auth)
    return authScreen();

  dashboard();

}

/* PROMENA ULOGE */

function cloudRole(r){

  state.role=r;

  localStorage.setItem(ROLE_KEY,r);

  dashboard();

}

/* OSVEŽAVANJE */

function cloudRefresh(){

  loadJobs();

}

/* ODJAVA */

function cloudLogout(){

  clearAuth();

  stopPoll();

  authScreen();

}

/* AUTOMATSKO OSVEŽAVANJE SERVISA */

function startPoll(){

  stopPoll();

  pollTimer=setInterval(()=>{

    if(document.visibilityState==="visible"){
      loadJobs();
    }

  },10000);

}

function stopPoll(){

  if(pollTimer){
    clearInterval(pollTimer);
    pollTimer=null;
  }

}

/* OBAVEŠTENJA — REGISTRACIJA UREĐAJA */

async function cloudNotify(){

  try {

    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      return toast("Ovaj uređaj ne podržava Push obaveštenja");
    }

    if (!("Notification" in window)) {
      return toast("Obaveštenja nisu podržana");
    }

    if (!state.auth?.user?.id) {
      return toast("Prvo se prijavi u Helios");
    }

    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      return toast("Dozvola za obaveštenja nije odobrena");
    }

    const registration = await navigator.serviceWorker.ready;

    let subscription = await registration.pushManager.getSubscription();

    if (!subscription) {
      const padding = "=".repeat((4 - VAPID_PUBLIC_KEY.length % 4) % 4);
      const base64 = (VAPID_PUBLIC_KEY + padding)
        .replace(/-/g, "+")
        .replace(/_/g, "/");

      const raw = atob(base64);
      const applicationServerKey = Uint8Array.from(
        raw,
        c => c.charCodeAt(0)
      );

      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey
      });
    }

    await api(
      "/rest/v1/push_subscriptions?on_conflict=user_id",
      {
        method: "POST",
        headers: {
          Prefer: "resolution=merge-duplicates,return=minimal"
        },
        body: JSON.stringify({
          user_id: state.auth.user.id,
          team_code: team(),
          subscription: subscription.toJSON()
        })
      }
    );

    toast("Uređaj je registrovan za Push obaveštenja!");

  } catch (e) {
    console.error("Push registracija:", e);
    toast("Push greška: " + e.message);
  }
}

/* JAVNE FUNKCIJE */

window.dispatcher=cloudScreen;

window.cloudSetup=setup;
window.cloudSaveConfig=cloudSaveConfig;

window.cloudLogin=async()=>{

  try{

    const email=document.getElementById("cl_email").value.trim();

    const password=document.getElementById("cl_pass").value;

    const teamCode=document.getElementById("cl_team").value.trim();

    await login(email,password,teamCode);

    dashboard();

    await loadJobs();

  }catch(e){

    toast("Prijava: "+e.message);

  }

};

window.cloudSignup=async()=>{

  try{

    const email=document.getElementById("cl_email").value.trim();

    const password=document.getElementById("cl_pass").value;

    const teamCode=document.getElementById("cl_team").value.trim();

    if(password.length<6)
      return toast("Lozinka mora imati najmanje 6 karaktera");

    const d=await signup(email,password,teamCode);

    if(!d.access_token)
      return toast("Nalog je napravljen. Potvrdi email pa se prijavi.");

    dashboard();

    await loadJobs();

  }catch(e){

    toast("Registracija: "+e.message);

  }

};

window.cloudCreateJob=cloudCreateJob;
window.cloudDeleteJob=deleteJob;
window.cloudPhoto=cloudPhoto;
window.cloudStatus=cloudStatus;
window.cloudImport=cloudImport;
window.cloudRole=cloudRole;
window.cloudRefresh=cloudRefresh;
window.cloudLogout=cloudLogout;
window.cloudNotify=cloudNotify;

})();
