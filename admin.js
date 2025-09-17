// Show messages
db.collection("messages").orderBy("timestamp")
  .onSnapshot(snapshot => {
    let container = document.getElementById("messages");
    container.innerHTML = "";
    snapshot.forEach(doc => {
      let m = doc.data();
      container.innerHTML += `
        <p><b>${m.sender}:</b> ${m.text} [${m.status}]
        <button onclick="markStatus('${doc.id}','completed')">Yes</button>
        <button onclick="markStatus('${doc.id}','rejected')">No</button></p>`;
    });
});

// Update status
function markStatus(id, status){
  db.collection("messages").doc(id).update({ status: status });
}

// Send reply
document.getElementById("replyForm").addEventListener("submit", e => {
  e.preventDefault();
  db.collection("messages").add({
    text: document.getElementById("reply").value,
    sender: "admin",
    status: "pending",
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  });
  document.getElementById("reply").value = "";
});
