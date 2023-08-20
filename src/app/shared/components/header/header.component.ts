import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SharedService } from '../../shared.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private router: Router, private sharedService: SharedService, private route: ActivatedRoute) { }
  cartCount = 0;
  search = '';
  showSearchBar: boolean = true;
  name: string = 'Hello ';
  isLoggedIn: boolean = false;
  @ViewChild('input', { static: false }) input!: ElementRef;

  ngOnInit() {
    this.sharedService.getSelctedItems().subscribe((res: any) => {
      this.cartCount = +res;
    });
    this.sharedService.checkLoginStatus().subscribe((isLoggedIn: boolean)=>{
      if(isLoggedIn){
        this.isLoggedIn = true;
        const user = JSON.parse(localStorage.getItem('user')!);
        if(user){
          this.name = `Hello ${user.firstname} ${user.lastname} !`;
        }
      }
    })
    this.route.queryParams.subscribe((res: any) => {
      this.search = res.search
    });
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: any) => {
      const path = event.urlAfterRedirects.split('?')[0];
      this.showSearchBar = (path === '/login' || path === '/cart') ? false : true;
    });
  }

  searchDOMmanipulation() {
    let search = document.querySelector('.search');
    let searchBox = document.querySelector('.searchBox');
    let cart = document.getElementById('cart');
    let userIcon = document.getElementById('userIcon');
    search?.addEventListener('click', function () {
      searchBox?.classList.add('active');
      cart?.classList.add('d-none')
      userIcon?.classList.add('d-none')
      search?.classList.add('d-none')
    });
    document.querySelector('.close')?.addEventListener('click', function () {
      searchBox?.classList.remove('active')
      cart?.classList.remove('d-none')
      userIcon?.classList.remove('d-none')
      search?.classList.remove('d-none')
    });

  }

  searchBarExpand() {
    document.querySelector('.search')?.classList.add('d-none');
    document.querySelector('.searchBox')?.classList.add('active');
    document.getElementById('cart')?.classList.add('d-none');
    document.getElementById('userIcon')?.classList.add('d-none');
  }
  searchBarCollapse() {
    document.querySelector('.searchBox')?.classList.remove('active')
    document.getElementById('cart')?.classList.remove('d-none')
    document.getElementById('userIcon')?.classList.remove('d-none')
    document.querySelector('.search')?.classList.remove('d-none')
  }

  navigate(link: string) {
    const queryParams: any = {}
    if (link === '/login') {
      if (this.router.url.split('?')[0] === '/login') return;
      queryParams['redirect'] = this.router.url.slice(1)
    }
    this.router.navigate([link], { queryParams: queryParams });
  }

  onInput(event: any) {
    if (!event && this.router.url.split('?')[0] !== '/all') return;
    this.input.nativeElement.blur();
    this.router.navigate(['/all'], { queryParams: { search: event } });
  }

  onSearch(search: string) {
    if (!search && this.router.url.split('?')[0] !== '/all') return;
    this.input.nativeElement.blur();
    this.router.navigate(['/all'], { queryParams: { search: search } });
  }
}
