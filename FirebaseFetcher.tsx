import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {collection, getDocs} from 'firebase/firestore';
import {db} from './firebase';

interface Student {
  id: string;
  name: string;
  age?: number; 
}

export default function FirebaseFetcher() {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'students'));
        const studentData: Student[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Student[];
        setStudents(studentData);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({item}: {item: Student}) => (
    <View style={styles.studentCard}>
      <Text style={styles.studentName}>{item.name}</Text>
      {item.age && <Text style={styles.studentDetail}>Age: {item.age}</Text>}
      <Text style={styles.studentDetail}>ID: {item.id}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Student List</Text>
      <FlatList
        data={students}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  studentCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  studentName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  studentDetail: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
});
