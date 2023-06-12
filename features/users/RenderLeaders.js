import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { ListItem } from 'react-native-elements';
import { useSelector } from 'react-redux';
import Colors from '../../constants/colors';

const RenderLeaderboard = ({ item: user }) => {
  return (
    <ListItem containerStyle={styles.listItemContainer}>
      <View style={{ marginLeft: 40 }}>
        <ListItem.Content style={styles.itemContent}>
          <View>
            <Text style={styles.item}>{user.name}</Text>
          </View>
          <View>
            <Text style={styles.item}>Solved: {user.solved}</Text>
            <Text style={styles.item}>Score: {user.score}</Text>
            <Text style={styles.item}>Region: {user.region}</Text>
          </View>
        </ListItem.Content>
      </View>
    </ListItem>
  );
};

// const RenderLeaderboard = ({ item: user }) => {
//   return (
//     <ListItem containerStyle={styles.listItemContainer}>
//       <ListItem.Content>
//         <View style={styles.userInfo}>
//           <Text style={styles.name}>{user.name}</Text>
//           <Text style={styles.userDetails}>
//             Solved: {user.solved} | Score: {user.score} | Region: {user.region}
//           </Text>
//         </View>
//       </ListItem.Content>
//     </ListItem>
//   );
// };

const RenderLeaders = ({ closeModal }) => {
  const users = useSelector((state) => state.users.usersArray);
  const [displayUsers, setDisplayUsers] = useState(users);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    sortUsersByScore();
  }, []);

  const searchUsers = (query) => {
    const sortedUsers = users.filter((user) =>
      user.name.toLowerCase().includes(query.toLowerCase())
    );
    setDisplayUsers(sortedUsers);
  };

  const sortUsersByScore = () => {
    const sortedUsers = [...users].sort((a, b) => b.score - a.score);
    setDisplayUsers(sortedUsers);
  };

  return (
    <>
      <ImageBackground
        source={require('../../assets/images/blackboardH.jpg')}
        style={styles.backgroundImage}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.leaderboardText}>Leaderboard</Text>
          <TextInput
            style={styles.searchInput}
            placeholder='Search by username...'
            value={searchQuery}
            onChangeText={(text) => {
              setSearchQuery(text);
              searchUsers(text);
            }}
          />
          <FlatList
            data={displayUsers}
            renderItem={RenderLeaderboard}
            keyExtractor={(user) => user.id.toString()}
          />
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1
  },
  listItemContainer: {
    backgroundColor: 'transparent',
    flex: 1
  },
  itemContent: {
    flexDirection: 'row'
  },
  item: {
    color: 'white',
    fontFamily: 'FuzzyBubbles',
    fontSize: 16,
    width: 180
  },
  modalContainer: {
    flex: 1,
    width: '100%',
    marginTop: 60,
    backgroundColor: 'transparent'
  },

  searchInput: {
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 20,
    width: 300
  },
  closeButton: {
    alignSelf: 'center',
    backgroundColor: Colors.color01,
    width: 100,
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    marginBottom: 20
  },
  closeButtonText: {
    color: 'black',
    fontFamily: 'Gaegu',
    fontSize: 18
  },
  leaderboardText: {
    color: 'white',
    fontFamily: 'FuzzyBubbles',
    letterSpacing: 2,
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 20
  }
});

export default RenderLeaders;
