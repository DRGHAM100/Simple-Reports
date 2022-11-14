@if ($message = Session::get('success'))
<div class="row">
    <div class="col-md-12">
            <div class="alert alert-success" role="alert">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">×</span>
            </button>
            <div class="d-flex align-items-center justify-content-start">
                <i class="icon ion-ios-checkmark alert-icon tx-32 mg-t-5 mg-xs-t-0"></i>
                <span>{!! $message !!}!</span>
            </div><!-- d-flex -->
            </div><!-- alert -->
        </div>
      </div>
@endif


@if ($message = Session::get('error'))
<div class="row">
        <div class="col-md-12">
                <div class="alert alert-danger" role="alert">
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
                <div class="d-flex align-items-center justify-content-start">
                    <i class="icon ion-ios-checkmark alert-icon tx-32 mg-t-5 mg-xs-t-0"></i>
                    <span>{!! $message !!} </span>
                </div><!-- d-flex -->
                </div><!-- alert -->
            </div>
          </div>

@endif

@if(session()->has('message'))
<div class="alert alert-danger alert-block">
	<button type="button" class="close" data-dismiss="alert">×</button>
        <strong>{!! session()->get('message') !!}</strong>
</div>
@endif

@if ($errors->any())

<div class="row">
        <div class="col-md-12">
                <div class="alert alert-danger" role="alert">
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
                <div class="d-flex align-items-center justify-content-start">
                    <i class="icon ion-ios-checkmark alert-icon tx-32 mg-t-5 mg-xs-t-0"></i>
                    <ul>
                        @foreach ($errors->all() as $key => $error)
                        <h6 class="text-dark"> {!!($key+1) .": ". $error !!}</h6>
                        @endforeach
                    </ul>
                </div><!-- d-flex -->
                </div><!-- alert -->
            </div>
          </div>

@endif




@if ($message = Session::get('warning'))
<div class="alert alert-warning alert-block">
	<button type="button" class="close" data-dismiss="alert">×</button>
	<strong>{!! $message !!}</strong>
</div>
@endif


@if ($message = Session::get('info'))
<div class="alert alert-info alert-block">
	<button type="button" class="close" data-dismiss="alert">×</button>
	<strong>{!! $message !!}</strong>
</div>
@endif


