CREATE FUNCTION `getParentList`(tableName varchar(64), rootId varchar(100))   
RETURNS varchar(1000)   
BEGIN   
DECLARE fid varchar(100) default '';   
DECLARE str varchar(1000) default rootId;   
  
IF tableName = 'menu' THEN  
	WHILE rootId is not null  do   
		SET fid =(SELECT parent_id FROM menu WHERE id = rootId);   
		IF fid is not null THEN   
				SET str = concat(str, ',', fid);   
				SET rootId = fid;   
		ELSE   
				SET rootId = fid;   
		END IF;   
	END WHILE;   
ELSEIF tableName = 'system_menu' THEN      
	WHILE rootId is not null  do   
		SET fid =(SELECT pid FROM menu WHERE id = rootId);   
		IF fid is not null THEN   
				SET str = concat(str, ',', fid);   
				SET rootId = fid;   
		ELSE   
				SET rootId = fid;   
		END IF;   
	END WHILE;
ELSEIF tableName = 'system_group' THEN      
	WHILE rootId is not null  do   
		SET fid =(SELECT pid FROM menu WHERE group_id = rootId);   
		IF fid is not null THEN   
				SET str = concat(str, ',', fid);   
				SET rootId = fid;   
		ELSE   
				SET rootId = fid;   
		END IF;   
	END WHILE;
END IF; 
return str;  
END