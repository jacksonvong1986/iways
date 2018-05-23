CREATE FUNCTION `getChildList`(tableName varchar(64), rootId varchar(100))   
RETURNS varchar(1000)  
BEGIN   
DECLARE str varchar(2000);  
DECLARE cid varchar(100);   

SET str = '$';   
SET cid = rootId;   

IF tableName = 'menu' THEN      
	WHILE cid is not null DO   
			SET str = concat(str, ',', cid);   
			SELECT group_concat(id) INTO cid FROM menu where FIND_IN_SET(parent_id, cid) > 0;   
	END WHILE;
ELSEIF tableName = 'system_menu' THEN      
	WHILE cid is not null DO   
			SET str = concat(str, ',', cid);   
			SELECT group_concat(id) INTO cid FROM system_group where FIND_IN_SET(pid, cid) > 0;   
	END WHILE;
ELSEIF tableName = 'system_group' THEN      
	WHILE cid is not null DO
			SET str = concat(str, ',', cid);
			SELECT group_concat(group_id) INTO cid FROM system_group where FIND_IN_SET(pid, cid) > 0;   
	END WHILE;
END IF;  
RETURN str;   
END