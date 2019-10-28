@extends('layouts.app')

@section('content')
<div class="container">
  <div class="row">
    <div class="col-4" style="padding-left:10em; padding-top: 2em;">
      <img
        src="https://www.aber.ac.uk/staff-profile-assets/img/noimg.png"
        alt="A profile image"
        class="rounded-circle"
        style="width: 100%;"
      >
    </div>
    <div class="col-8 pl-5">
      <div style="padding-top:6em;" class="d-flex justify-content-between align-items-baseline">
        <h1>{{ $user->name }}</h1>
        <a href="#">Add new post</a>
      </div>
      <div class="d-flex">
        <div class="pr-5"> <strong>100</strong>  Posts</div>
        <div class="pr-5"> <strong>200</strong>  followers</div>
        <div class="pr-5"> <strong>1000</strong> Likes</div>
      </div>
      <div class="pt-4 font-weight-bold"> {{ $user->profile->title}} </div>
      <div> {{ $user->profile->description}} </div>
      <div> <a href=""> {{ $user->profile->url }} </a></div>
    </div>
  </div>
</div>
@endsection
