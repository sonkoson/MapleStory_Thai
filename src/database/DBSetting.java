package database;

import server.ServerProperties;

public class DBSetting {

    public static final int CLOSE_CURRENT_RESULT = 1;
    public static final int KEEP_CURRENT_RESULT = 2;
    public static final int CLOSE_ALL_RESULTS = 3;
    public static final int SUCCESS_NO_INFO = -2;
    public static final int EXECUTE_FAILED = -3;
    public static final int RETURN_GENERATED_KEYS = 1;
    public static final int NO_GENERATED_KEYS = 2;

    public static final String DBDriver = "org.mariadb.jdbc.MySQLDataSource";
    public static final int DBMinIdle = 100;
    public static final int DBMaxPool = 2100000000;
    public static final Long DBConTimeOut = 500000L;
    public static final Long DBIdleTimeOut = 30L;

    public static final String DBSchema = ServerProperties.getProperty("query.schema");
    public static final String DBUser = ServerProperties.getProperty("query.user");
    public static final String DBPassword = ServerProperties.getProperty("query.password");
    public static final String DBUrl = "jdbc:mysql://localhost:3306/" + DBSchema + "?autoReconnect=true&characterEncoding=euckr&maxReconnects=5";

}
