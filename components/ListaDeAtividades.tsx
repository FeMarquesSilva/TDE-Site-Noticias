import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList, Button } from 'react-native';

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
}

const TaskApp: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const addTask = () => {
    if (title.trim() === '') return;
    const newTask: Task = {
      id: Math.random().toString(),
      title,
      description,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setTitle('');
    setDescription('');
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleCompleteTask = (id: string) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const renderItem = ({ item }: { item: Task }) => (
    <View style={styles.taskContainer}>
      <TouchableOpacity
        style={styles.task}
        onPress={() => toggleCompleteTask(item.id)}
      >
        <Text style={[styles.title, item.completed && styles.completedTitle]}>
          {item.title}
        </Text>
        {item.description ? <Text style={styles.description}>{item.description}</Text> : null}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteTask(item.id)} style={styles.deleteButton}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description (optional)"
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Add Task" onPress={addTask} />
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.taskList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  taskList: {
    paddingVertical: 10,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  task: {
    flex: 1,
  },
  title: {
    fontSize: 18,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  description: {
    fontSize: 14,
    color: 'gray',
  },
  deleteButton: {
    marginLeft: 10,
    padding: 5,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  deleteText: {
    color: 'white',
  },
});

export default TaskApp;