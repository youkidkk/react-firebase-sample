import { DATETIME_FORMAT, PRIORITY_DISPLAY } from "common/common-const";
import * as dateformat from "dateformat";
import "firebase/firestore";
import { FirebaseApp } from "./firebase-app";

const FireStore = FirebaseApp.firestore();

export async function getTodos(userId) {
  const res = await FireStore.collection("users")
    .doc(userId)
    .collection("todos")
    .get();
  if (res.empty) {
    return [];
  }
  const result = [];
  res.forEach((doc) => {
    result.push({
      id: doc.id,
      ...doc.data(),
      priorityDisplay: PRIORITY_DISPLAY[doc.data().priority],
    });
  });
  return result;
}

export async function getTodo(userId, id) {
  const res = await FireStore.collection("users")
    .doc(userId)
    .collection("todos")
    .doc(id)
    .get();
  if (res.exists) {
    return {
      id: res.id,
      ...res.data(),
      priorityDisplay: PRIORITY_DISPLAY[res.data().priority],
    };
  }
}

export async function createTodo(
  userId,
  overview,
  deadline,
  priority,
  details
) {
  const datetime = dateformat(new Date(), DATETIME_FORMAT);
  FireStore.collection("users").doc(userId).collection("todos").add({
    overview,
    deadline,
    priority,
    details,
    created: datetime,
    updated: datetime,
  });
}

export async function updateTodo(
  userId,
  id,
  overview,
  deadline,
  priority,
  details
) {
  const datetime = dateformat(new Date(), DATETIME_FORMAT);
  FireStore.collection("users").doc(userId).collection("todos").doc(id).update({
    overview,
    deadline,
    priority,
    details,
    updated: datetime,
  });
}
