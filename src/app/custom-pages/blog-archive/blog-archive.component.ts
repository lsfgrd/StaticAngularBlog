import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import Post from 'src/app/models/post';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog-archive',
  templateUrl: './blog-archive.component.html'
})
export class BlogArchiveComponent implements OnInit {

  posts: Post[];
  totalPosts: number;
  numPostsToLoad = 5;

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.getLatestPosts(0, this.numPostsToLoad)
      .subscribe(posts => this.posts = posts);
    
    this.postService.getTotalNumberOfPosts().subscribe(n => this.totalPosts = n);
  }

  loadMore() {
    this.postService.getLatestPosts(this.posts.length, this.numPostsToLoad)
      .subscribe(posts => this.posts.push(...posts));
  }

  get hasMorePosts(): boolean {
    return this.posts.length < this.totalPosts;
  }

}
