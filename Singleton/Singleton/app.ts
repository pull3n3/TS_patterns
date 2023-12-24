class DatabaseConnection {
    private static instance: DatabaseConnection | null = null;
    private isConnected: boolean = false;
    public constructor() {
        if (DatabaseConnection.instance) {
            return DatabaseConnection.instance;
        }
        DatabaseConnection.instance = this;
    }

    //Метод подключения к базе данных
    public connect(databaseName: string): void {
        console.log(`Connected to database: ${databaseName}`);
        this.isConnected = true;
    }

    //Метод отключения от базы данных
    public disconnect(): void {
        console.log(`Disconnected from the database`);
        this.isConnected = false;
    }

    //Метод выполнения запроса к базе данных
    public executeQuery(query: string): void {
        if (this.isConnected) {
            console.log(`Executing query: ${query}`);
        } else {
            console.error("Not connected to the database");
        }
    }
}

const dbConnection1 = new DatabaseConnection();
const dbConnection2 = new DatabaseConnection();

console.log(`Objects have the same instance? ${dbConnection1 === dbConnection2}`);

dbConnection1.connect("MyDatabase");
dbConnection1.executeQuery("SELECT * FROM users");

dbConnection2.disconnect();
dbConnection1.executeQuery("SELECT * FROM products");
