let previous=document.querySelector('#pre');
let play=document.querySelector('#play');
let next=document.querySelector('#next');
let title=document.querySelector('#title');
let recent_volume=document.querySelector('#volume');
let volume_show=document.querySelector('#volume_show');
let slider=document.querySelector('#duration_slider');
let show_duration=document.querySelector('#show_duration');
let track_image=document.querySelector('#track_image');
let auto_play=document.querySelector('#auto');
let present=document.querySelector('#present');
let total=document.querySelector('#total');
let artist=document.querySelector('#artist');

let timer;
let autoplay=0;

let index_no=0;
let playing_song = false;

// create an audio element
let track = document.createElement('audio');

// all songs list
let all_songs=[
    {
    name:"first song",
    path:"music/music1.mp3",
    img:"images/image1.jpg",
    singer:"1"
    },
    {
    name:"second song",
    path:"music/music2.mp3",
    img:"images/image2.jpg",
    singer:"2"
    },
    {
    name:"third song",
    path:"music/music3.mp3",
    img:"images/image3.jpg",
    singer:"3"
    },
    {
    name:"fourth song",
    path:"music/music4.mp3",
    img:"images/image4.jpg",
    singer:"4"
    },
    {
    name:"fifth song",
    path:"music/music5.mp3",
    img:"images/image5.jpg",
    singer:"5"
    }
];

//all functions

// function load the track
function load_track(index_no){
    clearInterval(timer);
    reset_slider();
    track.src=all_songs[index_no].path;
    title.innerHTML=all_songs[index_no].name;
    track_image.src=all_songs[index_no].img;
    artist.innerHTML=all_songs[index_no].singer;
    track.load();

    total.innerHTML = all_songs.length;
    present.innerHTML=index_no + 1;
    timer=setInterval(range_slider,1000);
}
load_track(index_no);

// mute sound
function mute_sound() {
    track.volume = 0;
    volume.value = 0;
    volume_show.innerHTML=0
}


// reset song slider
function reset_slider() {
    slider.value=0;
}

// checking if song is playingor not
function justplay(){
    if(playing_song==false)
    {
        playsong();
    }
    else{
        pausesong();
    }
}

// play song
function playsong(){
    track.play();
    playing_song=true;
    play.innerHTML='<i class="fa fa-pause" aria-hidden="true"></i>';
}

// pause song
function pausesong(){
    track.pause();
    playing_song=false;
    play.innerHTML='<i class="fa fa-pause" aria-hidden="true"></i>';
}

//next song
function next_song(){
    if(index_no < all_songs.length - 1){
        index_no+=1;
        load_track(index_no);
        playsong();
    }
    else{
        index_no = 0;
        load_track(index_no);
        playsong();
    }
}

//previous song

function previous_song(){
    if(index_no > 0){
        index_no -= 1; 
        load_track(index_no);
        playsong();
    }else{
        index_no = all_songs.length;
        load_track(index_no);
        playsong();
    }
}

//change volume
function volume_change(){
    volume_show.innerHTML = recent_volume.value;
    track.volume = recent_volume.value/100;
}

// autoplay function
function autoplay_switch(){
    if(autoplay==1){
        autoplay=0;
        auto_play.style.background ="rgba(225,225,225,0.2)";
    }else{
        autoplay=1;
        auto_play.style.background ="#FF8A65";
    }
}

//change slider position
function change_duration() {
    slider_position=track.duration * (slider.value/100);
    track.currentTime = slider_position;
}

function range_slider() {
    let position =0;

    // updatr slider position
    if(!isNaN(track.duration)){
        position=track.currentTime * (100 / track.duration);
        slider.value=position;

    }

// function will run when the song is over
if(track.ended){
     play.innerHTML='<i class="fa fa-play" aria-hidden="true"></i>';
     if(autoplay==1){
        index_no +=1;
        load_track(index_no);
        playsong();
     }
}

}