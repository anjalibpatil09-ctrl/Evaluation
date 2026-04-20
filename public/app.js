const API = "/api";

/* ================= AUTH ================= */

function login() {
  const email = document.getElementById("email")?.value;
  const password = document.getElementById("password")?.value;

  if (!email || !password) {
    alert("Enter email and password");
    return;
  }

  fetch(API + "/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })
    .then(res => res.json())
    .then(data => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);

        if(data.role==="admin")
  window.location="admin.html";
else if(data.role==="evaluator")
  window.location="evaluator.html";
else
  window.location="participant.html";

      }
    })
    .catch(err => console.log(err));
}

function logout() {
  localStorage.clear();
  window.location = "index.html";
}

function authHeader() {
  return {
    "Content-Type": "application/json",
    "Authorization": localStorage.getItem("token") || ""
  };
}

/* ================= REGISTER ================= */

function showRegister() {
  document.getElementById("loginBox").style.display = "none";
  document.getElementById("registerBox").style.display = "block";
}

function showLogin() {
  document.getElementById("loginBox").style.display = "block";
  document.getElementById("registerBox").style.display = "none";
}

function register() {
  fetch(API + "/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: document.getElementById("regName").value,
      email: document.getElementById("regEmail").value,
      password: document.getElementById("regPassword").value,
      role: "evaluator"
    })
  })
    .then(res => res.json())
    .then(() => {
      alert(" account created");
      showLogin();
    });
}

/* ================= TECHNOLOGIES ================= */

function loadTechnologies() {
  const dropdown = document.getElementById("pTech");
  if (!dropdown) return;

  fetch(API + "/technologies")
    .then(res => res.json())
    .then(data => {
      dropdown.innerHTML = '<option value="">Select Technology</option>';

      data.forEach(tech => {
        const opt = document.createElement("option");
        opt.value = tech.id;
        opt.textContent = tech.name;
        dropdown.appendChild(opt);
      });
    })
    .catch(err => console.log("Tech load error:", err));
}

/* ================= BATCH ================= */

function createBatch() {
  fetch(API + "/batches", {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({
      name: document.getElementById("batchName").value,
      start_date: document.getElementById("startDate").value,
      end_date: document.getElementById("endDate").value
    })
  })
    .then(res => res.json())
    .then(data => alert(data.message || "Batch created"));
}

/* ================= PARTICIPANT ================= */

function addParticipant() {
  fetch(API + "/participants", {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({
      name: document.getElementById("pName").value,
      email: document.getElementById("pEmail").value,
      batch_id: document.getElementById("pBatch").value,
      technology_id: document.getElementById("pTech").value
    })
  })
    .then(res => res.json())
    .then(data => alert(data.message || "Participant added"));
}

/* ================= LOAD PARTICIPANTS (Evaluator) ================= */

function loadParticipants() {

  const select = document.getElementById("participantSelect");
  if (!select) return;

  fetch("/api/participants")
    .then(res => res.json())
    .then(data => {

      select.innerHTML = "<option>Select Participant</option>";

      data.forEach(p => {
        const label =
          `${p.name} — ${p.technology || "No Tech"} — ${p.batch || "No Batch"}`;

        select.innerHTML += `<option value="${p.id}">${label}</option>`;
      });

      select.addEventListener("change", () => {

        const p = data.find(x => x.id == select.value);
        if (!p) return;

        document.getElementById("participantInfo").innerText =
          `Evaluating ${p.name} | Technology: ${p.technology} | Batch: ${p.batch}`;
      });

    });

}


/* ================= EVALUATION ================= */

function submitEvaluation() {
  fetch(API + "/evaluations", {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({
      participant_id: document.getElementById("participantSelect").value,
      round_number: document.getElementById("round").value,
      score: document.getElementById("score").value,
      feedback: document.getElementById("feedback").value
    })
  })
    .then(res => res.json())
    .then(data => alert(data.message || "Evaluation submitted"));
}
function loadMyScores(){

  fetch("/api/my-scores",{
    headers:{ Authorization:localStorage.getItem("token") }
  })
  .then(res=>res.json())
  .then(data=>{

    document.getElementById("myTech").innerText =
      "Technology: " + data.technology;

    document.getElementById("myBatch").innerText =
      "Batch: " + data.batch;

    let rows="";
    data.scores.forEach(s=>{
      rows+=`
        <tr>
          <td>${s.round_number}</td>
          <td>${s.score}</td>
          <td>${s.feedback}</td>
        </tr>
      `;
    });

    document.querySelector("#scoreTable tbody").innerHTML=rows;

  });

}
function loadBatches(){

 const dropdown=document.getElementById("pBatch");
 if(!dropdown) return;

 fetch("/api/batches")
  .then(res=>{
   if(!res.ok) throw new Error("API failed");
   return res.json();
  })
  .then(data=>{

   dropdown.innerHTML="<option value=''>Select Batch</option>";

   data.forEach(b=>{
    dropdown.innerHTML+=`
     <option value="${b.id}">${b.name}</option>
    `;
   });

  })
  .catch(err=>{
   console.log("Batch load error:", err);
  });

}




/* ================= AUTO INIT ================= */

document.addEventListener("DOMContentLoaded", () => {
  loadTechnologies();
  loadParticipants();
  loadBatches();
});
