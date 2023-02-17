import {EventEmitter, Injectable} from "@angular/core";
import { Observable,Subject} from 'rxjs';
export class MyEventEmitter  {
    private subject = new Subject<any>();

    sendMessage(message: any) {
        this.subject.next(message);
    }

    clearMessage() {
        this.subject.next(null);
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}
export interface SignedinUser {
  signedinUser: any;

}

@Injectable()
export class GlobalEventsManagerService {
    public showNavBar: EventEmitter<boolean> = new EventEmitter();
    public userOnlineOffline: EventEmitter<boolean> = new EventEmitter();
    // public loggedInUser: EventEmitter<boolean> = new EventEmitter();
    // public userLogin: EventEmitter<boolean> = new EventEmitter();
    // public userLogout: EventEmitter<boolean> = new EventEmitter();
    // public userSignedAndLoggedin: EventEmitter<SignedinUser> = new EventEmitter();
    // public userprofileUpdated: EventEmitter<boolean> = new EventEmitter();
     
    constructor() {

    }
}