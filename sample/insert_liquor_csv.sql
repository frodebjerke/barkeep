LOAD DATA INFILE '~/Prog/barkeep/scripts/oregon_liquors.csv' INTO TABLE liquor FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' (age,code,id,proof,volume_ml,slug,name);
