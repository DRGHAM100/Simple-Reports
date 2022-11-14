<div class="main-menu menu-fixed menu-light menu-accordion menu-shadow" data-scroll-to-active="true">
    <div class="navbar-header">
        <ul class="nav navbar-nav flex-row">
            <li class="nav-item mr-auto"><a class="navbar-brand" href="{{url('/home')}}">
                    <span class="brand-logo"></span>
                    <h2 class="brand-text"> إدارة البلاغات</h2>
                </a></li>
            <li class="nav-item nav-toggle"><a class="nav-link modern-nav-toggle pr-0" data-toggle="collapse"><i class="d-block d-xl-none text-primary toggle-icon font-medium-4" data-feather="x"></i><i class="d-none d-xl-block collapse-toggle-icon font-medium-4  text-primary" data-feather="disc" data-ticon="disc"></i></a></li>
        </ul>
    </div>
    <div class="shadow-bottom"></div>
    <div class="main-menu">
        <ul class="navigation navigation-main" id="main-menu-navigation" data-menu="menu-navigation" >
            @if(Auth::user()->type == 1)
            <li class="br-menu-item">
                <a href="{{ route('notes.index') }}" class="br-menu-link" >
                    <i data-feather="circle" class="text-primary"></i>
                    <span class="menu-item-label">الملاحظات  </span>
                </a>
            </li>
            @endif
            <li class="br-menu-item ">
                <a href="" class="br-menu-link with-sub ">
                    <i data-feather="edit" class="text-success"></i>
                    <span class="menu-item-label"> البلاغات </span>
                </a>
                <ul class="br-menu-sub">
                    <li class="sub-item"><a href="{{ route('reports.create') }}" class="sub-link"><i data-feather="plus" class="text-success"></i> بلاغ جديد </a></li>
                    <li class="sub-item"><a href="{{ route('reports.index') }}" class="sub-link"><i data-feather="file" class="text-success"></i> جميع البلاغات</a></li>
                    <li class="sub-item"><a href="{{ route('reports.types',['status' => 'opened']) }}" class="sub-link"><i data-feather="file" class="text-success"></i>  البلاغات المفتوحة</a></li>
                    <li class="sub-item"><a href="{{ route('reports.types',['status' => 'closed']) }}" class="sub-link"><i data-feather="file" class="text-success"></i>  البلاغات المغلقة</a></li>
                    <li class="sub-item"><a href="{{ route('reports.types',['status' => 'confirmed']) }}" class="sub-link"><i data-feather="file" class="text-success"></i>  البلاغات المغلقة مع إفادة</a></li>
                </ul>
            </li>
            <li class="br-menu-item ">
                <a href="" class="br-menu-link with-sub ">
                    <i data-feather="edit" class="text-success"></i>
                    <span class="menu-item-label"> التصنيفات </span>
                </a>
                <ul class="br-menu-sub">
                    <li class="sub-item"><a href="{{ route('categories.create') }}" class="sub-link"><i data-feather="plus" class="text-success"></i> تصنيف جديد </a></li>
                    <li class="sub-item"><a href="{{ route('categories.index') }}" class="sub-link"><i data-feather="file" class="text-success"></i> جميع التصنيفات</a></li>
                </ul>
            </li>
            <li class="br-menu-item ">
                <a href="" class="br-menu-link with-sub ">
                    <i data-feather="edit" class="text-success"></i>
                    <span class="menu-item-label"> الموظفين </span>
                </a>
                <ul class="br-menu-sub">
                    <li class="sub-item"><a href="{{ route('employees.create') }}" class="sub-link"><i data-feather="plus" class="text-success"></i> موظف جديد  </a></li>
                    <li class="sub-item"><a href="{{ route('employees.index') }}" class="sub-link"><i data-feather="users" class="text-success"></i> جميع الموظفين </a></li>
                </ul>
            </li>
        </ul>
    </div>
</div>