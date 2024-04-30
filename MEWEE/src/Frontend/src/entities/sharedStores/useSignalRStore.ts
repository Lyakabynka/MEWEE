import * as signalR from "@microsoft/signalr";
import { EnumPlanType, EnumPlatform, IPlan, IPlanPlanGroup, useAuthStore } from "..";
import { create } from "zustand";

interface IPlanPlanGroupExtended extends IPlanPlanGroup {
    index: number,
}

declare global {
    interface Window {
        electron: boolean | undefined | null;
        planProcessor: any;
        planGroupProcessor: any;
    }
}

interface ISignalRStore {
    connection: signalR.HubConnection | null,
    isElectron: () => boolean,
    establishConnection: (userId: string) => Promise<void>,
    joinChat: (chatId: string) => Promise<void>,
    sendMessage: (chatId: string, content: string, createdAt: string) => Promise<void>,
    closeConnection: () => Promise<void>
}
interface Message {
    id: string;
    content: string;
    createdAt: Date;
    // Add other properties as needed
  }
  interface ChatInfo {
    id: string;
    unreadMessagesCount: number;
    lastMessage: Message | null;
    // Add other properties as needed
  }

export const useSignalRStore = create<ISignalRStore>()((set, get) => ({

    connection: null,

    isElectron: () => {
        return window.electron !== null && window.electron !== undefined;
    },
    
    establishConnection: async (userId) => {


        if (get().connection !== null) {
            await get().closeConnection();
        }
        
        set({
            connection: new signalR.HubConnectionBuilder()
            .withUrl("http://localhost:5002/hubs/message")
            .configureLogging(signalR.LogLevel.Information)
            .withAutomaticReconnect()
            .build()
        })
        
        const { connection } = get();
        
        connection!.onreconnecting(() => {
            console.warn('Connection with server has been lost. Trying to reconnect...');
        })
        connection!.on('onUserJoinedMessage', (role, message: string) =>
            {
                console.log("onUserJoinedMessage: "+role+", "+message);
            });
        connection!.on('receiveMessage', (message: string) =>
            {
                console.log("receiveMessage: "+message);
            });
        
        await connection!.start().then(() => {
            console.info("Connection with SignalR hub has been successfully established!");
        }).catch((e) => {
            console.log("Server is offline");
            console.log(e);
        });
        await connection!.invoke('initializesession')
        .then(() => {
          console.log('initializeSession invoked successfully');
        })
        .catch((error) => {
          console.error('Error invoking initializeSession:', error);
        });

    },
    joinChat: async (chatId: string) => {
        const { connection } = get();
        if (!connection) return;
    
        try {


          await connection.invoke('JoinChat', chatId).then(() =>
        {
            console.log("Requested JoinChat");
        });
        } catch (error) {
          console.error('Error invoking joining chat:', error);
        }
      },
    sendMessage: async (chatId: string, content: string, createdAt: string) => {
        const { connection } = get();
        if (!connection) return;
    
        try {

          await connection.invoke('SendMessage', chatId, content, createdAt).then(() =>
        {
            console.log("MESSAGE SENT");
        });
        } catch (error) {
          console.error('Error invoking SendMessage:', error);
        }
      },
    closeConnection: async () => {
        const { connection } = get();
        await connection?.stop();
        set({ connection: null });
    }
}))