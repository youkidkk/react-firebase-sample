import { DATETIME_FORMAT, PRIORITY_DISPLAY } from "common/common-const";
import * as dateformat from "dateformat";
import "firebase/firestore";
import { app } from "./firebase-app";

const db = app.firestore();

export async function getTodos(userId) {
  const res = await db
    .collection("users")
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
  const res = await db
    .collection("users")
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
  db.collection("users").doc(userId).collection("todos").add({
    overview,
    deadline,
    priority,
    details,
    created: datetime,
    updated: datetime,
  });
}
