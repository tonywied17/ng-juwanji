import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog } from '../_models/blog.model';

const baseUrl = 'http://localhost:8080/blog';

@Injectable({
  providedIn: 'root'
})


export class BlogService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Blog[]> {
    return this.http.get<Blog[]>(baseUrl);
  }

  get(id: any): Observable<Blog> {
    return this.http.get<Blog>(`${baseUrl}/${id}`);
  }

  getByTag(tag: any): Observable<Blog> {
    return this.http.get<Blog>(`${baseUrl}/tags/${tag}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: any): Observable<Blog[]> {
    return this.http.get<Blog[]>(`${baseUrl}?title=${title}`);
  }

  

}
