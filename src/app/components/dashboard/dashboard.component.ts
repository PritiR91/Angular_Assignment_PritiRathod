import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private http: HttpService, private router: Router) { }
  usersList: any = [];
  columns: string[] = [];
  sortedColumn: string = "";
  shadow!:any;
dragit(event:any){
  this.shadow=event.target;
}
dragover(e:any){
  let children=Array.from(e.target.parentNode.parentNode.children);
if(children.indexOf(e.target.parentNode)>children.indexOf(this.shadow))
  e.target.parentNode.after(this.shadow);
  else e.target.parentNode.before(this.shadow);
}

  
  ngOnInit() {
    this.getUsers();
  }
  getUsers() {
    this.http.getdataFromServer('users').subscribe((Response: any) => { //actual backend responsed
      if (Response && Response.length > 0) {
        this.usersList = Response;
        this.columns = Object.keys(this.usersList[0]);
      }
    },
      (err: any) => {
        alert(err);
      }
    );
  }
  delete(user: any, index: number) {
    const endPoint = 'users/' + user.id;
    this.http.deleteDataFromServer(endPoint).subscribe(
      (response: any) => {
        this.usersList.splice(index, 1);
        // console.log("Data deleted successfully!",response);
        alert("Data deleted successfully!");
      },
      (error: any) => {
        alert(error);
      }
    );
  }
  logout() {
    this.router.navigate(['/login']);
  }

}
