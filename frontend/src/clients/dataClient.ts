import { firestore } from "firebase-admin"
const converter = <T>() => ({
    toFirestore: (data: T) => data,
    fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot) =>
        snap.data() as T
})

function firestore() {
    throw new Error('Function not implemented.')
}
