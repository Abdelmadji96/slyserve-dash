create table particulier (
    id  Integer primary key AUTO_INCREMENT,
    genre char not null,
    nom varchar(20) not null,
    prenom varchar(20) not null,
    date_de_naissance date not null,
    telephone varchar(15) not null unique,
    email varchar(50),
    mot_de_passe  varchar(100) not null,
    nom_de_rue varchar(100) not null,
    wilaya_id Integer,
    foreign key (wilaya_id) references wilaya (id),
    commune_id Integer,
    foreign key (commune_id) references commune (id) 
);


create table donneur_sang (
    id  Integer primary key,
    genre char,
    nom varchar(20),
    prenom varchar(20),
    date_de_naissance date,
    telephone varchar(15),
    email varchar(50),
    mot_de_passe  varchar(100),
    nom_de_rue varchar (100),
    wilaya_id Integer,
    foreign key (wilaya_id) references wilaya (id),
    commune_id Integer,
    foreign key (commune_id) references commune (id) 
    groupe_sanguin varchar(3)
);

create table medecin (
    id  Integer primary key,
    genre char,
    nom varchar(20),
    prenom  varchar(20),
    date_de_naissance date,
    telephone varchar(15),
    email varchar (50),
    mot_de_passe  varchar (100), 
    specialite varchar (50),
    nom_de_rue varchar (100),
    wilaya_id Integer,
    foreign key (wilaya_id) references wilaya (id),
    commune_id Integer,
    foreign key (commune_id) references commune (id) 
    presentation text,
    formations text,
    langues_parlees text,
);

create table ambulance (
    id Integer primary key ,
    telephone varchar(15),
    email varchar (50),
    mot_de_passe  varchar (100), 
    nom_de_rue varchar (100),
    wilaya_id Integer,
    foreign key (wilaya_id) references wilaya (id),
    commune_id Integer,
    foreign key (commune_id) references commune (id) 
);


create table pharmacie (
    id Integer primary key ,
    telephone varchar(15),
    email varchar (50),
    mot_de_passe  varchar (100), 
    nom_de_rue varchar (100),
    wilaya_id Integer,
    foreign key (wilaya_id) references wilaya (id),
    commune_id Integer,
    foreign key (commune_id) references commune (id) 
);



create table clinique (
    id Integer primary key ,
    telephone varchar(15),
    email varchar (50),
    mot_de_passe  varchar (100), 
    nom_de_rue varchar (100),
    wilaya_id Integer,
    foreign key (wilaya_id) references wilaya (id),
    commune_id Integer,
    foreign key (commune_id) references commune (id) 
);

   
create table tarifs (
    id Integer primary key,
    intitule_tarif varchar (50),
    prix_tarif integer,
    medecin_id Integer,
   foreign key (medecin_id) references medecin (id) on delete cascade
);

create table rendez_vous (
    id  Integer primary key,
    type_rdv varchar(20),
    date_rdv  datetime,
    lien_consultation text,
    medecin_id Integer,
    foreign key (medecin_id) references medecin (id) on delete cascade,
    patient_id Integer,
    foreign key (medecin_id) references particulier (id) on delete cascade
);

table abonnement {
     id : char,

}

table documents (
    id  char,
    type_document: varchar,
    proprietaire_document : char (foreign key)
)

create table paramedical (
    id 
)