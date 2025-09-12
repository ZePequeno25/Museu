CREATE DATABASE IF NOT EXISTS museu;

use museu;

create table obrasdearte(
	id int primary key auto_increment,
    nome varchar(45) not null,
    artista varchar(45),
    ano int not null,
    urlimagem text not null,
    created_at timestamp default current_timestamp
);

create table comments(
	id int primary key auto_increment,
    comentary text not null,
    id_obradearte int not null,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    foreign key (id_obradearte)references obrasdearte(id)
    ON DELETE CASCADE  
);

insert into obrasdearte (nome, artista, ano, urlimagem) values("Cafe", "Cândido Portinari", "1935", "https://firebasestorage.googleapis.com/v0/b/museu-virtual-dd512.appspot.com/o/portinariacafe.jpg?alt=media&token=6a326b9a-d32f-491f-8bd7-54d10ab3af99");
insert into obrasdearte (nome, artista, ano, urlimagem) values("Mestiço", "Cândido Portinari", "1934", "https://firebasestorage.googleapis.com/v0/b/museu-virtual-dd512.appspot.com/o/portinarimestico.jpg?alt=media&token=1e6e8b8b-76b0-4fca-bc3f-4a970278a354");
insert into obrasdearte (nome, artista, ano, urlimagem) values("Os Retirantes", "Cândido Portinari", "1944", "https://firebasestorage.googleapis.com/v0/b/museu-virtual-dd512.appspot.com/o/portinariosretirantes.jpg?alt=media&token=037ef56f-1a00-4d7e-a11e-700ea432818c");
insert into obrasdearte (nome, artista, ano, urlimagem) values("A Cuca", "Tarsila do Amaral", "1924", "https://firebasestorage.googleapis.com/v0/b/museu-virtual-dd512.appspot.com/o/tarsilaacuca.jpg?alt=media&token=24f1997c-c9fd-49c4-8d16-9e7e3fd2213d");
insert into obrasdearte (nome, artista, ano, urlimagem) values("A Negra", "Tarsila do Amaral", "1923", "https://firebasestorage.googleapis.com/v0/b/museu-virtual-dd512.appspot.com/o/tarsilaanegra.jpg?alt=media&token=1362eaea-ba5d-4cf0-85e8-2ddc50b7070e");
insert into obrasdearte (nome, artista, ano, urlimagem) values("São Paulo", "Tarsila do Amaral", "1924", "https://firebasestorage.googleapis.com/v0/b/museu-virtual-dd512.appspot.com/o/tarsilasaopaulo.jpg?alt=media&token=8f32ed58-73ad-441c-8566-7cfacc7f78ef");

