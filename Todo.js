import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import react, { useEffect, useState } from "react";
// アイコンの読み込み
import Icon from "react-native-vector-icons/Entypo";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
// DBの読み込み
import { db } from "../../firebaseConfig";
// import { doc, getDoc } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";

export const Todo = () => {
  const taskNames = [];

  const [text, setText] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    const newTask = { name: text, id: tasks.length + 1 };
    const copyTasks = [...tasks];
    copyTasks.push(newTask);
    setTasks(copyTasks);
    setText("");
  };

  const deleteTask = (id) => {
    console.log("tasks", tasks);
    const deleteTasks = [...tasks];
    // setTasks(deleteTasks);
    console.log("deleteTask", id);
    const newTasks = deleteTasks.filter((deletetask) => {
      return deletetask.id !== id;
    });
    console.log("newTasks", newTasks);
    setTasks(newTasks);
  };

  // console.log("dbは？", db);

  // console.log("docRef", docRef);

  const getDb = async () => {
    // 指定してとる
    // const docRef = doc(db, "todos", "WynnaGJFCPpOMOBrpBt4");
    // const docSnap = await getDoc(docRef);
    // console.log("docSnap", docSnap);
    // console.log("docSnap.data", docSnap.data());

    // 全てとる方法
    const querySnapshot = await getDocs(collection(db, "todos"));
    const copyDbTasks = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      const newDbTask = { name: doc.data().name, id: doc.id };
      copyDbTasks.push(newDbTask);
      console.log("copyDbTasks", copyDbTasks);
    });
    setTasks(copyDbTasks);
  };

  // useEffectを使ってみる
  useEffect(() => {
    console.log("useEffect使用中。DBは？：", db);
    // console.log("useEffect使用中。getDBは？：", gedDb);
    console.log("useEffect使用中。copyDbTasksは？：", copyDbTasks);
  }, []);

  // ①DBをタスクに追加
  // 取得したタスクを
  // pushする
  // ②タスクを削除
  // そのタスクを削除する、
  // →DBからも削除するのか？

  return (
    <View style={styles.container}>
      <View style={styles.writeSide}>
        <View style={styles.textArea}>
          <TextInput
            style={styles.text}
            placeholder={"テキストを入力…"}
            onChangeText={(inputText) => setText(inputText)}
            value={text}
          ></TextInput>

          <View style={styles.plusButton}>
            <TouchableOpacity onPress={addTask}>
              <Icon name="plus" color="pink" size={50} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.taskList}>
        {/* Flatlistを使用しての書き方 */}
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.tasks}>
              <View>
                <Text style={styles.task}>{item.name}</Text>
              </View>
              <View style={styles.trash}>
                <TouchableOpacity onPress={() => deleteTask(item.id)}>
                  <Icon2 name="trash-can-outline" color="pink" size={30} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    // 左右真ん中
    alignItems: "center",
    // 上下真ん中
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  writeSide: {
    flex: 1,
    borderStyle: "solid",
    borderBottomWidth: "1p",
    borderColor: "gray",
    width: "100%",
    // 上下真ん中
    justifyContent: "center",
    // 左右真ん中
    alignItems: "center",
  },
  textArea: { flexDirection: "row" },
  text: {
    borderStyle: "solid",
    borderBottomWidth: "2p",
    borderColor: "gray",
    width: "70%",
    fontSize: 20,
  },
  plus: {},

  taskList: {
    flex: 4,
    width: "100%",
    // 左右真ん中
    alignItems: "center",
  },
  tasks: {
    // 左右真ん中
    alignItems: "center",
    // 横並び
    flexDirection: "row",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 20,
    margin: 10,
  },
  task: {
    fontSize: 25,
    width: 230,
    padding: 15,
    margin: 10,
  },
  trash: {
    marginRight: 15,
  },
});
