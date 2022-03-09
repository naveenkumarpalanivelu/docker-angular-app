import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { DncService } from '../services/dnc.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-custom-dnc',
  templateUrl: './custom-dnc.component.html',
  styleUrls: ['./custom-dnc.component.css']

})
export class CustomDncComponent implements OnInit {
  msg: string | undefined;
  // selectBulk: any;
  selectedLevel: any;
  dncItem: any;
  dncErrormsg: any;
  selectSingle: any;
  isSingledncValidate: boolean = false;
  isDisableEndDate: boolean = false;
  isDisableEndHours: boolean = false;
  isDisbleEndMin: boolean = false;
  isdisableEndTime: boolean = false;
  dnclist: any;
  // isSelected: any;
  customDncList: any;
  isdisableSingleDNC: boolean = false;
  isdisablebulkDNC: boolean = false;
  dncListId: number | undefined;

  firstName: any;
  lastName: any;
  accountNo: any;
  clientIdNumber: any;
  startTimeDate: any;
  endTimeDate: any;
  reason: any;
  phone1: any;
  phone2: any;
  phone3: any;
  phone4: any;
  phone5: any;
  phone6: any;
  phone7: any;
  phone8: any;
  email1: any;
  email2: any;
  email3: any;
  email4: any;
  email5: any;
  dncStartTimeDate: any;
  dncEndTimeDate: any;
  createdDate: any;
  updatedDate: any;
  processFlag: any;
  uploadFile: any;
  isDisabled: any;
  // router: any;
  // currentLocalTime!: string;
  // currentCustomerTime!: string;
  // currentSelCustomerTime!: Date;
  // enteredPhoneNumber!: string;
  startDateAndTime!: string;
  endDateAndTime!: any;
  //agentNotes = '';
  startDate!: string;
  ddlhours = '';
  ddlmin = '';
  ddltime = '';
  ddlendhours = '';
  ddlendmin = '';
  ddlendtime = '';
  minDate!: string;
  maxDate!: string;
  endDate!: string;
  minEndDate!: string;
  // callbackExpiryDateAndTime!: Date;
  // incorrectStartDate!: boolean;
  defaultStartDate!: Date;
  //spinner!: any;
  popup = false;
  messageText: any;
  // public showModal = false;
  // public timezonesList: any;
  // public dncDetails: any;
  // public timeType = 'LocalTime';
  // public externalNumber = false;
  //public selectedTimezone: any;
  // public selectedPhone: any;
  public hours = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  public minutes = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];
  public time = ["AM", "PM"];
  currentDateTime: any;
  isbulkInsert: boolean = false;
  //  msgCancel: any;
  confirmpopup: boolean = false;
  msgconfirm!: string;
  currentDate = new Date();
  isPhoneEmailID: boolean = false;
  isDateTime: boolean = false;
  // isEmailID: boolean = false;
  isDNCList: boolean = false;
  Url = this.dncservices.BULK_DNC_REST_URL;

  public records: any[] = [];




  @ViewChild('csvReader') csvReader: any;
  jsondatadisplay: any;

  @ViewChild('form', { static: true })
  form!: NgForm;

  constructor(private http: HttpClient,
    private router: Router,
    private dncservices: DncService,
  ) {
  }
  Cancel() {
    try {
      this.msgconfirm = this.dncservices.resetErrormsg;
      this.confirmpopup = true;
    } catch (error) {
      console.log("Cancel error : ", error);
    }

  }
  setDefaultValue() {
    this.form.resetForm();
    var todayDate = new Date();
    const minutes = todayDate.getMinutes();
    const hours = todayDate.getHours();
    console.log('current date', todayDate);

    this.startDate = this.getISOStringFormatDate(todayDate);
    this.endDate = this.getISOStringFormatDate(todayDate);
    this.defaultStartDate = todayDate;
    console.log('start date - ', this.startDate);

    this.minDate = this.minEndDate = this.getISOStringFormatDate(todayDate);
    this.maxDate = this.getISOStringFormatDate(new Date(todayDate.getFullYear(), todayDate.getMonth() + 1, 0));

    const minString = (Math.round(minutes / 5) * 5 + 5).toString();
    this.ddltime = this.ddlendtime = hours >= 12 ? 'PM' : 'AM';
    this.ddlhours = this.ddlendhours = ("0" + (todayDate.getHours() % 12 || 12)).slice(-2);
    this.ddlmin = this.ddlendmin = parseInt(minString) >= 60 ? '00' : (minString.length === 1 ? ('0' + minString) : minString);
    this.startDateAndTime = this.startDate + " " + this.ddlhours + ":" + this.ddlmin + " " + this.ddltime;
    this.endDateAndTime = this.endDate + " " + this.ddlendhours + ":" + this.ddlendmin + " " + this.ddlendtime;
    this.form.controls.startDate.setValue(this.startDate);
    this.form.controls.endDate.setValue(this.endDate);
    this.form.controls.ddlhours.setValue(this.ddlhours);
    this.form.controls.ddlmin.setValue(this.ddlmin);
    this.form.controls.ddltime.setValue(this.ddltime);
    this.form.controls.ddlendhours.setValue(this.ddlendhours);
    this.form.controls.ddlendmin.setValue(this.ddlendmin);
    this.form.controls.ddlendtime.setValue(this.ddlendtime);
    this.form.controls.dncListId.setValue("");
  }


  ngOnInit() {
    try {
      if (this.dncservices.isAuthenticated == true) {
        this.bulkDNCChange();
        this.GetDNCList();
      }
      else
        this.router.navigate(['/dnclogin']);
    }
    catch (error) {
      console.log("ngOnInit error : ", error);
    }
  }

  loadStartDateTime() {
    try {
      console.log('start date', this.startDate);
      let ddhours = ''
      if (this.ddltime == 'PM' && Number(this.ddlhours) != 12) {
        ddhours = (Number(this.ddlhours) + 12).toString();
      } else if (this.ddltime == 'AM' && Number(this.ddlhours) == 12) {
        ddhours = (Number(this.ddlhours) - 12).toString();
      } else {
        ddhours = this.ddlhours;
      }
      const startValue = this.startDate + " " + ddhours + ":" + this.ddlmin + " " + this.ddltime;
      var newDate = new Date(this.startDate);
      this.minEndDate = this.getISOStringFormatDate(newDate);
      this.startDateAndTime = startValue;
    }
    catch (error) {
      console.log("loadStartDateTime error", error);

    }
  }


  loadEndDateTime() {
    try {
      console.log('end date', this.endDate);
      let endddhours = ''
      if (this.ddlendtime == 'PM' && Number(this.ddlendhours) != 12) {
        endddhours = (Number(this.ddlendhours) + 12).toString();
      } else if (this.ddlendtime == 'AM' && Number(this.ddlendhours) == 12) {
        endddhours = (Number(this.ddlendhours) - 12).toString();
      } else {
        endddhours = this.ddlendhours;
      }
      const endValue = this.endDate + " " + endddhours + ":" + this.ddlendmin + " " + this.ddlendtime;
      this.endDateAndTime = endValue;
    } catch (error) {
      console.log("loadEndDateTime error : ", error);
    }
  }

  setDefaultCallbackStartDate(todayDate = new Date()) {
    try {
      const minutes = todayDate.getMinutes();
      const hours = todayDate.getHours();
      console.log('current date', todayDate);

      this.startDate = this.getISOStringFormatDate(todayDate);
      this.endDate = this.getISOStringFormatDate(todayDate);
      this.defaultStartDate = todayDate;
      console.log('start date - ', this.startDate);

      this.minDate = this.minEndDate = this.getISOStringFormatDate(todayDate);
      this.maxDate = this.getISOStringFormatDate(new Date(todayDate.getFullYear(), todayDate.getMonth() + 1, 0));

      const minString = (Math.round(minutes / 5) * 5 + 5).toString();
      this.ddltime = this.ddlendtime = hours >= 12 ? 'PM' : 'AM';
      this.ddlhours = this.ddlendhours = ("0" + (todayDate.getHours() % 12 || 12)).slice(-2);
      this.ddlmin = this.ddlendmin = parseInt(minString) >= 60 ? '00' : (minString.length === 1 ? ('0' + minString) : minString);
      this.startDateAndTime = this.startDate + " " + this.ddlhours + ":" + this.ddlmin + " " + this.ddltime;
      this.endDateAndTime = this.endDate + " " + this.ddlendhours + ":" + this.ddlendmin + " " + this.ddlendtime;
    }
    catch (error) {
      console.log("setDefaultCallbackStartDate error :", error);
    }
  }

  getISOStringFormatDate(date = new Date()) {
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();
    const year = date.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    return [year, month, day].join('-');
  }


  endDateOption(event: any) {
    try {
      console.log(event);
      if (event.target.checked == true) {
        this.isDisableEndDate = this.isDisableEndHours = this.isDisbleEndMin = this.isdisableEndTime = true;
        this.endDateAndTime = null;
      }
      else
        this.isDisableEndDate = this.isDisableEndHours = this.isDisbleEndMin = this.isdisableEndTime = false;
    }
    catch (error) {
      console.log("endDateOption error : ", error);

    }
  }

  //get DNC list 
  GetDNCList() {
    try {
      var Url = this.dncservices.DNC_LIST_URL;
      this.dncservices.get(Url, '').subscribe(data => {
        console.log("Getdata custom data : ", data);
        this.dnclist = data;
        console.log("Dnc list :", this.dnclist);
      });
    }
    catch (error) {
      console.log("GetDNCList error : ", error);
    }
  }

  dncListChange(name: any) {
    try {
      if (name != null) {
        this.customDncList = name.dncListName;
        this.dncListId = name.dncListId;
      }

    } catch (error) {
      console.log("dncListChange error :", error);
    }
  }

  checkSpcialChar(event: any, num: any) {
    var k;
    k = event.charCode;  //         k = event.keyCode;  (Both can be used)
    if (num != "")
      return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || k == 45 || (k >= 48 && k <= 57));
    else
      return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
  }

  checkNumber(event: any) {
    var n;
    n = event.charCode
    return (n == 43 || n == 45 || (n >= 48 && n <= 57))
  }


  dncSingleInsert() {
    try {
      this.messageText = "Hello";
      this.isSingledncValidate = false;
      var singleObject: any = this.form.value;
      console.log("Single Entry form Information : ", singleObject);
      if (singleObject["customDncList"] == undefined || singleObject["customDncList"] == "Select DNC List" || singleObject["customDncList"] == null) {
        this.isDNCList = true;
      }
      else {
        this.isDNCList = false;
      }
      if ((singleObject["phone1"] == "" || singleObject["phone1"] == null) && (singleObject["phone2"] == "" || singleObject["phone2"] == null) &&
        (singleObject["phone3"] == "" || singleObject["phone3"] == null) && (singleObject["phone4"] == "" || singleObject["phone4"] == null) &&
        (singleObject["phone5"] == "" || singleObject["phone5"] == null) && (singleObject["phone6"] == "" || singleObject["phone6"] == null)
        && (singleObject["phone7"] == "" || singleObject["phone7"] == null) && (singleObject["phone8"] == "" || singleObject["phone8"] == null)
        && (singleObject["email1"] == "" || singleObject["email1"] == null) && (singleObject["email2"] == "" || singleObject["email2"] == null) &&
        (singleObject["email3"] == "" || singleObject["email3"] == null) && (singleObject["email4"] == "" || singleObject["email4"] == null) &&
        (singleObject["email5"] == "" || singleObject["email5"] == null)) {
        this.isPhoneEmailID = true;
      }
      else {
        this.isPhoneEmailID = false;
      }


      // if () {
      //   this.isEmailID = true;
      // }
      // else {
      //   this.isEmailID = false;this.isEmailID &&this.isEmailID &&
      // }

      var todayDate = formatDate(this.currentDate, 'yyyy-MM-dd HH:mm:ss', 'en-US');

      if (this.isDNCList && this.isPhoneEmailID) {
        this.dncservices.myFunction();
        this.messageText = this.dncservices.dncPhoneEmailDNCListErrormsg;
        this.isSingledncValidate = true;
        return;
      }
      // Start date cannot be greater than end date
   /*   else if (this.startDateAndTime >= this.endDateAndTime) {
        this.dncservices.myFunction();
        this.messageText = this.dncservices.dncDateTime;
        this.isSingledncValidate = true;
        return;
      }
      else if (this.startDateAndTime >= todayDate) {
        this.dncservices.myFunction();
        this.messageText = "Current cannot be start date";
        this.isSingledncValidate = true;
        return;
      }
      else if (this.endDateAndTime >= todayDate) {
        this.dncservices.myFunction();
        this.messageText = "Current cannot be end date";
        this.isSingledncValidate = true;
        return;
      }*/
      else if (this.isDNCList && this.isPhoneEmailID == false) {
        this.dncservices.myFunction();
        this.messageText = this.dncservices.dncListErrormsg;
        this.isSingledncValidate = true;
        return;
      }

      else if (this.isDNCList == false && this.isPhoneEmailID) {
        this.dncservices.myFunction();
        this.messageText = this.dncservices.dncPhoneEmailIDErrormsg;
        this.isSingledncValidate = true;
        return;
      }

      // else if (this.isEmailID && this.isPhone == false && this.isDNCList == false) {
      //   this.dncservices.myFunction();
      //   this.messageText = this.dncservices.dncEmailErrormsg;
      //   this.isSingledncValidate = true;
      //   return;
      // }
      // else if (this.isEmailID == false && this.isPhone && this.isDNCList == false) {
      //   this.dncservices.myFunction();
      //   this.messageText = this.dncservices.dncPhoneErrormsg;
      //   this.isSingledncValidate = true;
      //   return;
      // }
      // else if (this.isEmailID == false && this.isPhone && this.isDNCList) {
      //   this.dncservices.myFunction();
      //   this.messageText = this.dncservices.dncPhoneDNCListErrormsg;
      //   this.isSingledncValidate = true;
      //   return;
      // }
      // else if (this.isDNCList && this.isEmailID == false && this.isPhone == false) {
      //   this.dncservices.myFunction();
      //   this.messageText = this.dncservices.dncListErrormsg;
      //   this.isSingledncValidate = true;
      //   return;
      // }
      else {
        this.isSingledncValidate = false;
      }
      var dateTime = formatDate(this.currentDate, 'yyyy-MM-dd HH:mm:ss', 'en-US');

      ['dncName', 'startDate', 'ddlhours', 'ddlmin', 'ddlendhours', 'ddlendmin', 'ddlendtime', 'ddltime', 'endDate', 'noenddate'].forEach(function (k) {
        delete singleObject[k];
      });

      singleObject["dncStartTimeDate"] = null;
      singleObject["dncEndTimeDate"] = null;
      singleObject["createdDate"] = dateTime;
      singleObject["updatedDate"] = dateTime;

      if (!this.form.controls.email1.invalid && !this.form.controls.email2.invalid &&
        !this.form.controls.email3.invalid && !this.form.controls.email4.invalid && !this.form.controls.email5.invalid) {

        console.log(singleObject);
        var Url = this.dncservices.SINGLE_DNC_REST_URL;
        console.log("Single DNC REST URL : ", Url);
        let body = JSON.stringify(singleObject);
        this.dncservices.post(Url, body).subscribe(data => {
          console.log("Single dnc:", data);
          var singleResponse: any = data.body;
          console.log("Single file respone", singleResponse);
          if (singleResponse["Webservice_Response"] == this.dncservices.successRestAPIResponse) {
            this.popup = true;
            console.log(this.dncservices.successInsertmsg);
            this.msg = this.dncservices.successInsertmsg;
            this.isSingledncValidate = false;
            this.setDefaultValue();
          }
        },
          error => {
            console.log("Single DNC Error", error)
            let errorMessage = '';
            if (error.error instanceof ErrorEvent) {
              // client-side error
              errorMessage = `Error: ${error.error.message}`;
            } else {
              // server-side error
              errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
            }
            console.log(errorMessage);
          });
      }
      else {
        this.dncservices.myFunction();
        this.messageText = this.dncservices.dncEmailIDErrormsg;
      }
    }
    catch (error) {
      console.log("dncSingleInsert", error);
    }
  }

  uploadListener($event: any): void {
    try {
      let text = [];
      let files = $event.srcElement.files;
      var csvHeader = this.dncservices.BULK_CSV_HEADER_NAME;
      console.log("upload file name : ", this.uploadFile)

      if (this.isValidCSVFile(files[0])) {

        let input = $event.target;
        let reader = new FileReader();
        reader.readAsText(input.files[0]);

        reader.onload = () => {
          let csvData: any = reader.result;
          let csvRecordsArray = (csvData).split(/\r\n|\n/);

          let headersRow = this.getHeaderArray(csvRecordsArray);
          if (JSON.stringify(headersRow.toString().toUpperCase()) == JSON.stringify(csvHeader.toString().toUpperCase())) {
            this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
            console.log("CSV Record", this.records);
            this.jsondatadisplay = JSON.stringify(this.records);
            console.log("Json data", this.jsondatadisplay);
            if (this.records.length != 0) {
              this.isDisabled = true;
            }
          }
          else {
            this.isDisabled = false;
            this.popup = true;
            this.msg = this.dncservices.csvFileErrormsg;
            this.fileReset();
          }

        }
      }
      else {
        this.popup = true;
        this.msg = this.dncservices.csvFileErrormsg;
        console.log("Invalid .CSV file");
        this.fileReset();
      }
    }
    catch (error) {
      console.log("uploadListener error : ", error);
    }
  }

  dncBulkInsert() {
    try {
      console.log("Click bulk upload");
      this.isbulkInsert = true;

      let body = JSON.stringify(this.records);
      this.dncservices.post(this.Url, body).subscribe(data => {
        console.log(data);
        var bulkResponse: any = data.body;
        console.log("Bulk data insert Rest API respone : ", bulkResponse);
        if (bulkResponse["Webservice_Response"] == this.dncservices.successRestAPIResponse) {
          console.log(this.dncservices.successBulkInsertmsg);
          this.popup = true;
          this.isbulkInsert = false;
          this.msg = this.dncservices.successBulkInsertmsg;
          this.fileReset();
        }
      },
        error => {
          console.log("Bulk upload Error", error)
          let errorMessage = '';
          if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
          } else {
            // server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          }
          console.log(errorMessage);
        });

    } catch (error) {
      console.log("dncBulkInsert error : ", error);
    }
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    class DNCData {
      public firstName: any;
      public lastName: any;
      public accountNo: any;
      public clientIdNumber: any;
      public customDncList: any;
      public dncListId: any;
      public startTimeDate: any;
      public endTimeDate: any;
      public reason: any;
      public phone1: any;
      public phone2: any;
      public phone3: any;
      public phone4: any;
      public phone5: any;
      public phone6: any;
      public phone7: any;
      public phone8: any;
      public email1: any;
      public email2: any;
      public email3: any;
      public email4: any;
      public email5: any;
      public dncStartTimeDate: any;
      public dncEndTimeDate: any;
      public createdDate: any;
      public updatedDate: any;
      public startProcessFlag: any;
      public endProcessFlag: any;

      public id: any;
      public min: any;
      public max: any;
      public score: any;
    }
    let csvArr = [];
    var currentDateTime = formatDate(this.currentDate, 'yyyy-MM-dd HH:mm:ss', 'en-US');

    for (let i = 1; i < csvRecordsArray.length; i++) {
      let curruntRecord = (csvRecordsArray[i]).split(',');
      if (curruntRecord.length == headerLength) {
        let csvRecord: DNCData = new DNCData();
        csvRecord.firstName = curruntRecord[0];
        csvRecord.lastName = curruntRecord[1];
        csvRecord.accountNo = curruntRecord[2]; csvRecord.clientIdNumber = curruntRecord[3];
        if (curruntRecord[4].trim() != null && curruntRecord[4].trim() != '') {

          const filterBy = curruntRecord[4].trim().toLocaleLowerCase();
          const result = this.dnclist.filter((dnc: any) =>
            dnc.dncListName.toLocaleLowerCase().indexOf(filterBy) !== -1);
          if (result != 0) {
            csvRecord.dncListId = result[0].dncListId;
            csvRecord.customDncList = result[0].dncListName;
          }
          else {
            csvRecord.customDncList = curruntRecord[4].trim();
          }
        }

        if (curruntRecord[5].trim() != "" && curruntRecord[5].trim() != "null")
          csvRecord.startTimeDate = curruntRecord[5].trim();
        else
          csvRecord.startTimeDate = null;
        if (curruntRecord[6].trim() != "" && curruntRecord[6].trim() != "null")
          csvRecord.endTimeDate = curruntRecord[6].trim();
        else
          csvRecord.endTimeDate = null;
        csvRecord.reason = curruntRecord[7].trim();
        csvRecord.phone1 = curruntRecord[8].trim();
        csvRecord.phone2 = curruntRecord[9].trim();
        csvRecord.phone3 = curruntRecord[10].trim();
        csvRecord.phone4 = curruntRecord[11].trim();
        csvRecord.phone5 = curruntRecord[12].trim();
        csvRecord.phone6 = curruntRecord[13].trim();
        csvRecord.phone7 = curruntRecord[14].trim();
        csvRecord.phone8 = curruntRecord[15].trim();
        csvRecord.email1 = curruntRecord[16].trim();
        csvRecord.email2 = curruntRecord[17].trim();
        csvRecord.email3 = curruntRecord[18].trim();
        csvRecord.email4 = curruntRecord[19].trim();
        csvRecord.email5 = curruntRecord[20].trim();
        csvRecord.dncStartTimeDate = null;
        csvRecord.dncEndTimeDate = null;
        csvRecord.createdDate = currentDateTime;
        csvRecord.updatedDate = currentDateTime;
        csvArr.push(csvRecord);
      }
    }
    return csvArr;
  }

  //check etension
  isValidCSVFile(file: any) {
    return file.name.endsWith(".csv");
  }

  getHeaderArray(csvRecordsArr: any) {
    let headers = (csvRecordsArr[0]).split(',');
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

  // clickMethod(name: string) {
  //   if (confirm("Are you sure to delete " + name)) {
  //     console.log("Implement delete functionality here");
  //   }
  // }

  fileReset() {
    try {
      this.csvReader.nativeElement.value = "";
      this.records = [];
      this.jsondatadisplay = '';
      this.isDisabled = false;
    } catch (error) {
      console.log("fileReset", error);
    }
  }

  // getJsonData() {
  //   this.jsondatadisplay = JSON.stringify(this.records);
  // }

  bulkDNCChange() {
    this.isdisablebulkDNC = false;
    this.isdisableSingleDNC = true;
    this.form.resetForm();
  }

  // onItemChange(value: any) {
  //   console.log("Checkbox Value is : ", value);
  // }

  singleDNCChange() {
    this.isdisablebulkDNC = true;
    this.isdisableSingleDNC = false;
    this.GetDNCList();
    // this.setDefaultCallbackStartDate();
    this.setDefaultValue();
    this.msg = "";
  }


  onNoClick() {
    this.confirmpopup = false;
  }
  confirm() {
    this.setDefaultValue();
    this.isSingledncValidate = false;
  }
  closeModal() {
    this.confirmpopup = false;
  }
}