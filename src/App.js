import React from 'react';

import './App.css';
import { BrowserRouter as  Switch, Route,  BrowserRouter } from "react-router-dom";

import SchoolList from './pages/homepage/schools';
import LoginPage from './pages/auhentication/login';
import RegisterPage from './pages/auhentication/register';
import { Modal } from './pages/auhentication/components/Modal';
import CuStudents from './pages/homepage/students/cü';
import AdyuStudents from './pages/homepage/students/adyu';
import TeduStudents from './pages/homepage/students/tedu';
import ThkuStudents from './pages/homepage/students/thku';
import AkduStudents from './pages/homepage/students/akdu';
import BaunStudents from './pages/homepage/students/baun';
import AtuStudents from './pages/homepage/students/atu';
import BrtStudents from './pages/homepage/students/brt';
import BuStudents from './pages/homepage/students/bu';
import BounStudents from './pages/homepage/students/boun';
import IouStudents from './pages/homepage/students/iou';
import KayuStudents from './pages/homepage/students/kayu';
import KluStudents from './pages/homepage/students/klu';
import KmyoStudents from './pages/homepage/students/kmyo';
import KostuStudents from './pages/homepage/students/kostu';
import KauStudents from './pages/homepage/students/kau';
import BaibuStudents from './pages/homepage/students/baibu';
import KtunStudents from './pages/homepage/students/ktun';
import AtauniStudents from './pages/homepage/students/atauni';
import NkuStudents from './pages/homepage/students/nku';
import YtuStudents from './pages/homepage/students/ytu';

function App() {
return (
    
    <BrowserRouter>
    <div className="App">
    
    <Switch>
          <Route exact path="/" component={LoginPage} />
          
          <Route path="/login" component={LoginPage} />
          <Route path="/modal" component={Modal} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/schools"  component={SchoolList} />
          <Route path="/ÇÜ"  component={CuStudents} />
          <Route path="/TEDÜ"  component={TeduStudents} />
          <Route path="/THKÜ"  component={ThkuStudents} />
          <Route path="/AKDÜ"  component={AkduStudents} />
          <Route path="/BAÜN"  component={BaunStudents} />
          <Route path="/ATÜ"  component={AtuStudents} />
          <Route path="/BRT"  component={BrtStudents} />
          <Route path="/BÜ"  component={BuStudents} />
          <Route path="/BOÜN"  component={BounStudents} />
          <Route path="/İOÜ"  component={IouStudents} />
          <Route path="/KAYÜ"  component={KayuStudents} />
          <Route path="/YTÜ"  component={YtuStudents} />
          <Route path="/KLÜ"  component={KluStudents} />
          <Route path="/KMYO"  component={KmyoStudents} />
          <Route path="/KOSTÜ"  component={KostuStudents} />
          <Route path="/KAÜ"  component={KauStudents} />
          <Route path="/BAİBÜ"  component={BaibuStudents} />
          <Route path="/ADYÜ"  component={AdyuStudents} />
          <Route path="/KTÜN"  component={KtunStudents} />
          <Route path="/ATAÜNİ"  component={AtauniStudents} />
          <Route path="/NKÜ"  component={NkuStudents} />
        </Switch>

</div>
    </BrowserRouter>

  );
}

export default App;