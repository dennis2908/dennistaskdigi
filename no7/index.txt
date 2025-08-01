create table Produk( 
   Id number not null primary key, 
   produk number not null,
   jumlahPesanan number not null,
   email varchar2 null, 
   tanggalOrder date not null
 )