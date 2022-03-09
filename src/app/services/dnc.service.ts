import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { variable } from '@angular/compiler/src/output/output_ast';
import { Observable, Subject } from 'rxjs';



@Injectable({
    providedIn: 'root'
})

export class DncService {
    public configUrl: any = "assets/data/configService.json";
    dncServerIP!: any;
    DNC_SERVER: any;
    DNC_IMAGE_FOLDER: any;
    TOMCAT_SERVER_PATH: any;
    DNC_API_PATH: any;
    LOGIN_DNC_REST_URL: any;
    SINGLE_DNC_REST_URL: any;
    BULK_DNC_REST_URL: any;
    DNC_LIST_URL: any;
    private subject = new Subject<any>();
    constructor(private http: HttpClient) {
        this.getJSON().subscribe(data => {
            console.log("Server IP : ", data);
            this.dncServerIP = data["serverPath"];
            this.getServerIP();
        });
    }

    public getJSON(): Observable<any> {
        return this.http.get(this.configUrl)
    }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        }),
        observe: 'response' as 'response'
    };

    post(url: any, body: any) {
        return this.http.post(url, body, this.httpOptions);
    }

    get(url: any, body: any) {
        return this.http.get(url, body + this.httpOptions);
    }

    getServerIP() {
        this.DNC_SERVER = this.dncServerIP;
        // DNC_SERVER_PORT = "8080";
        this.DNC_IMAGE_FOLDER = "/ABSA/absaservice/image";
        this.TOMCAT_SERVER_PATH = "/ABSA/absaservice";
        //  DNC_API_PATH = "http://" + this.DNC_SERVER + ":" + this.DNC_SERVER_PORT.trim() + this.TOMCAT_SERVER_PATH.trim();

        this.DNC_API_PATH = this.DNC_SERVER + this.TOMCAT_SERVER_PATH.trim();

        // DNC Common REST URLs
        // Login
        this.LOGIN_DNC_REST_URL = this.DNC_API_PATH + "/UserLogin";

        // Single
        this.SINGLE_DNC_REST_URL = this.DNC_API_PATH + "/SingleDNC";

        //Bulk
        this.BULK_DNC_REST_URL = this.DNC_API_PATH + "/BulkDNC";

        // DNClist
        this.DNC_LIST_URL = this.DNC_API_PATH + "/DNCList";
    }

    //Authenticate check
    isAuthenticated: boolean = false;


    BULK_CSV_HEADER_NAME = ["FIRST_NAME",
        "LAST_NAME",
        "ACCOUNT_NO",
        "CLIENT_ID_NUMBER",
        "CUSTOM_DNC_LIST",
        "START_TIME_DATE",
        "END_TIME_DATE",
        "REASON",
        "PHONE1",
        "PHONE2",
        "PHONE3",
        "PHONE4",
        "PHONE5",
        "PHONE6",
        "PHONE7",
        "PHONE8",
        "EMAIL1",
        "EMAIL2",
        "EMAIL3",
        "EMAIL4",
        "EMAIL5"];

    myFunction() {
        var x = document.getElementById("snackbar");
        if (x != null)
            x.className = "show";
        setTimeout(function () {
            if (x != null)
                x.className = x.className.replace("show", "");
        }, 3000);
    };

    //login
    loginErrormsg = "Login failed, please try again!.";
    loginmsg = "Please enter the User Name and Password ";

    resetErrormsg = "Do you want to Cancel ?";
    successInsertmsg = "DNC record has been uploaded successfully";
    successRestAPIResponse = "REST_REQUEST_SUCCESS";
    csvFileErrormsg = "Please upload the valid csv file";
    successBulkInsertmsg = "DNC bulk records has been uploaded successfully";

    //single dnc validation message
    dncPhoneEmailDNCListErrormsg = "Please enter the Phone Number or Email ID and select the Custom DNS List";
    dncPhoneEmailIDErrormsg = "Please enter the Phone Number or Email ID";
    dncListErrormsg = "Please select the Custom DNC List";
    dncEmailIDErrormsg = "Please enter the Valid Email ID";
    dncDateTime = "Start date cannot be greater than end date";
}


