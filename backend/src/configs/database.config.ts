import { connect, ConnectOptions } from "mongoose";

export const DbConnect = () => {
    connect(process.env.MongoUri!).then(
        () => console.log("connect successfully"),
        (error) => console.log(error)
    )
}

