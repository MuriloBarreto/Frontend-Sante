import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';;
@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  constructor(private httpClient: HttpClient) { }

  getData() {
    return this.httpClient.get('http://localhost:3000/api/users');
  }

  insertData(data) {
    return this.httpClient.post('http://localhost:3000/api/users', data);
  }

  getDataById(id) {
    return this.httpClient.get('http://localhost:3000/api/users/'+ id);
  }

  updateData(id, data){
    return this.httpClient.put('http://localhost:3000/api/users/'+ id, data);
  }

  deleteData(id) {
    return this.httpClient.delete('http://localhost:3000/api/users/'+ id);
  }
}
