// Send message
document.getElementById("msgForm").addEventListener("submit", (e) => {
  e.preventDefault();
  db.collection("messages").add({
    text: document.getElementById("msg").value,
    sender: "customer",
    status: "pending",
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  });
  document.getElementById("msg").value = "";
});

// Listen messages
db.collection("messages").orderBy("timestamp")
  .onSnapshot(snapshot => {
    let chat = document.getElementById("chat");
    chat.innerHTML = "";
    snapshot.forEach(doc => {
      let m = doc.data();
      let color = m.status === "completed" ? "green" : 
                  (m.status === "rejected" ? "red" : "black");
      chat.innerHTML += `<p style="color:${color}">
        <b>${m.sender}:</b> ${m.text}</p>`;
    });
});
