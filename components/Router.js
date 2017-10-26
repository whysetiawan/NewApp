import {StackNavigator} from 'react-navigation';
import Index from '../src/';
import Login from '../src/Login';
import Register from '../src/Register';
import Menu from '../src/home_screen/Menu';
import AddStudio from '../src/home_screen/Add Studio';
import AddStudio2 from '../src/home_screen/Add Studio 2';
import AddStudio3 from '../src/home_screen/Add Studio 3';
import Detail from '../src/home_screen/Detail';
import MyStudio from '../src/home_screen/My Studio';
import EditStudio from '../src/home_screen/Edit Studio';
import Schedule from '../src/home_screen/Schedule';

export const Stack = StackNavigator({
	Index: { screen:Index },
	Login: { screen:Login },
	Register: { screen:Register },
	Menu : { screen:Menu },
	Add : { screen:AddStudio },
	Add2 : { screen:AddStudio2},
	Add3 : { screen:AddStudio3},
	Detail : { screen:Detail },
	MyStudio: { screen:MyStudio },
	EditStudio: { screen:EditStudio },
	Schedule: { screen:Schedule },
})
