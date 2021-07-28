export const renderTasksFromFirestore = () => {
    const db = firebase.firestore();
    db.settings({ timestampsInSnapshots: true });
    db.collection('tasks').get().then(snapshot => {
        console.log(snapshot.docs)
        snapshot.docs.forEach(task => console.log(task.data()))
    });
}