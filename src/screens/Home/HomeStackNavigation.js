/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

import React from 'react';
import {TouchableOpacity, View, Text, TouchableHighlight} from 'react-native';
import {
  createMaterialTopTabNavigator,
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';

import Icon from "react-native-vector-icons/FontAwesome5";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {BLUE_DARK, BLUE_LIGHT, WHITE} from '../../util/colors';

import ContactsScreen from './Contacts/ContactsScreen';
import SettingsScreen from './Settings/SettingsScreen';
import SpeedDialScreen from './SpeedDial/SpeedDialScreen';
import ContactsListScreen from './AddContact/ContactsListScreen';
import AddContact from './AddContact/AddContact';
import ChangeAccountScreen from "./Settings/ChangeAccountScreen";
import PasswordConfirmDialog from "./SpeedDial/PasswordConfirmDialog";

/**
 * Tabs navigation
 */
const TabNavigator = createMaterialTopTabNavigator({
  ContactsScreen: {
    screen: ContactsScreen,
    navigationOptions: ({navigation}) => ({
      title: 'Contatos',
      tabBarOptions: {
        showIcon: false,
        style: {
          backgroundColor: BLUE_LIGHT
        },
        indicatorStyle: {
          backgroundColor: BLUE_DARK,
          height: 5
        },
        inactiveTintColor: '#8eacbb',
        activeTintColor: WHITE,
        labelStyle: {
          fontWeight: 'bold'
        }
      }
    })
  },
  SettingsScreen: {
    screen: SettingsScreen,
    navigationOptions: ({navigation}) => ({
      title: 'Configurações',
      tabBarOptions: {
        showIcon: false,
        style: {
          backgroundColor: BLUE_LIGHT
        },
        indicatorStyle: {
          backgroundColor: BLUE_DARK,
          height: 5
        },
        inactiveTintColor: '#8eacbb',
        activeTintColor: WHITE,
        labelStyle: {
          fontWeight: 'bold'
        }
      }
    })
  }
},{
  tabBarPosition: 'top',
  navigationOptions: ({navigation}) => ({
    headerRight: (
      <View style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          width: 140
        }}>
        <TouchableOpacity>
          <Icon
            name="users"
            size={22}
            color={WHITE}
            style={{marginRight: 25}}
            onPress={() => {navigation.navigate('ContactsList')} }/>
        </TouchableOpacity>
  
        <TouchableOpacity>
          <Icon
            name="user-plus"
            size={20}
            color={WHITE}
            style={{marginRight: 20}}
            onPress={() => navigation.navigate('AddContact', {
              givenName: '',
              familyName: ''
            })}
          />
        </TouchableOpacity>
  
        <TouchableOpacity>
          <MaterialCommunityIcon
            name="phone-forward"
            size={25}
            color={WHITE}
            style={{marginRight: 25}}
            onPress={() => {navigation.navigate('SpeedDial')} } />
        </TouchableOpacity>
      </View>
    )
  })
});

/**
 * Stack navigation
 */
const StackNavigator = createStackNavigator({
  Home: TabNavigator,
  ChangeAccount: {
    screen: ChangeAccountScreen,
    navigationOptions: ({navigation}) => ({
      title: 'Atualizar Dados',
      mode: 'modal',
      headerStyle: {
        backgroundColor: BLUE_LIGHT
      },
      headerTintColor: WHITE
    }),
  },
  PasswordConfirmDialog: {
    screen:PasswordConfirmDialog,
    navigationOptions: ({navigation}) => ({
      title: 'Confirmação de Senha',
      mode: 'modal',
      headerStyle: {
        backgroundColor: BLUE_LIGHT
      },
      headerTintColor: WHITE,
      headerBackImage: (
        <TouchableHighlight onPress={() => {navigation.navigate('SpeedDial')} }>
          <MaterialIcon
            name="close"
            size={25}
            color={WHITE} />
        </TouchableHighlight>
      )
    }),
  },
  SpeedDial: {
    screen: SpeedDialScreen,
    navigationOptions: ({navigation}) => ({
      title: 'Discagem Rápida',
      mode: 'modal',
      headerStyle: {
        backgroundColor: BLUE_LIGHT
      },
      headerTintColor: WHITE,
      headerBackImage: (
        <TouchableHighlight onPress={() => {navigation.navigate('PasswordConfirmDialog')} }>
          <MaterialIcon
            name="arrow-back"
            size={25}
            color={WHITE} />
        </TouchableHighlight>
      )
    })
  },
  ContactsList: {
    screen: ContactsListScreen,
    navigationOptions: ({navigation}) => ({
      title: 'Adicionar Contato',
      mode: 'modal',
      headerStyle: {
        backgroundColor: BLUE_LIGHT
      },
      headerTintColor: WHITE,
      headerRight: (
          <TouchableOpacity>
            <Icon
              name="user-plus"
              size={20}
              color={WHITE}
              style={{marginRight: 25}}
              onPress={() => navigation.navigate('AddContact', {
                givenName: '',
                familyName: ''
              })}
            />
          </TouchableOpacity>
      )
    }),
  },
  AddContact: {
    screen: AddContact,
    navigationOptions: ({navigation}) => ({
      title: navigation.state.params.contact_id ? 'Editar Contato' : 'Novo Contato',
      mode: 'modal',
      headerStyle: {
        backgroundColor: BLUE_LIGHT
      },
      headerTintColor: WHITE
    }),
  }
},{
  defaultNavigationOptions: ({navigation}) => {
    return {
      headerMode: 'screen',
      title: 'INTERFONNE',
      headerTintColor: WHITE,
      headerStyle: {
        backgroundColor: BLUE_LIGHT,
        elevation: 0,
        shadowOpacity: 0
      }
    }
  }
});

export default createAppContainer(StackNavigator);