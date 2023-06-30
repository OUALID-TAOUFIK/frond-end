import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent {
  CustomerArray: any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;

  customername: string = '';
  customeraddress: string = '';
  mobile: Number = 0;
  customerdebut = new Date(); 
  customerfin = new Date(); 

  currentCustomerID = '';

  constructor(private http: HttpClient) {
    this.getAllCustomer();
  }

  getAllCustomer() {
    this.http.get("http://localhost:8084/api/v1/customer/getAllCustomer")
      .subscribe((resultData: any) => {
        this.isResultLoaded = true;
        console.log(resultData);
        this.CustomerArray = resultData;
      });
  }

  register() {
    let bodyData = {
      "customername": this.customername,
      "customeraddress": this.customeraddress,
      "customerdebut": this.customerdebut,
      "customerfin": this.customerfin
    };
    this.http.post("http://localhost:8084/api/v1/customer/save", bodyData, { responseType: 'text' }).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Employee enregistré avec succès");
      this.getAllCustomer();

      this.customername = '';
      this.customeraddress = '';
      this.mobile = 0;
      this.customerdebut = new Date();
      this.customerfin = new Date();
    });
  }

  setUpdate(data: any) {
    this.customername = data.customername;
    this.customeraddress = data.customeraddress;
    this.mobile = data.mobile;
    this.customerdebut = data.customerdebut;
    this.customerfin = data.customerfin;
    this.currentCustomerID = data.customerid;
  }

  UpdateRecords() {
    let bodyData = {
      "customerid": this.currentCustomerID,
      "customername": this.customername,
      "customeraddress": this.customeraddress,
      "mobile": this.mobile,
      "customerdebut": this.customerdebut,
      "customerfin": this.customerfin
    };

    this.http.put("http://localhost:8084/api/v1/customer/update", bodyData, { responseType: 'text' }).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Employee mis à jour avec succès");
      this.getAllCustomer();
      this.customername = '';
      this.customeraddress = '';
      this.mobile = 0;
      this.customerdebut = new Date();
      this.customerfin = new Date();
    });
  }

  save() {
    if (this.currentCustomerID == '') {
      this.register();
    } else {
      this.UpdateRecords();
    }
  }

  setDelete(data: any) {
    this.http.delete("http://localhost:8084/api/v1/customer/deletecustomer" + "/" + data.customerid, { responseType: 'text' }).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Employee supprimé avec succès");
      this.getAllCustomer();

      this.customername = '';
      this.customeraddress = '';
      this.mobile = 0;
      this.customerdebut = new Date();
      this.customerfin = new Date();
    });
  }
}

export class VotreComposant {
  redirectToCustomerPage() {
    // Redirigez vers la page customer.do.html
    window.location.href = 'customer.do.html';
  }
}
