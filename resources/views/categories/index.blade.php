@extends('layouts.appp')
@section('content')
<div class="container">
    <div class="row">
            @foreach($categories as $cateogry)
            <button class="btn btn-primary btn-block" type="button" data-toggle="collapse" data-target="#multiCollapseExample{{ $cateogry->id }}" aria-expanded="false" aria-controls="multiCollapseExample{{ $cateogry->id }}">{{ $cateogry->name }}</button>
            <br>
            @foreach($cateogry->sub_categories as $sub)
                <div class="col-12">
                    <div class="collapse multi-collapse" id="multiCollapseExample{{ $cateogry->id }}">
                        <div class="card card-body m-2">
                            {{ $sub->name }}
                        </div>
                    </div>
                </div>
            @endforeach
            <br>
        @endforeach
    </div>  
</div>
@endsection
