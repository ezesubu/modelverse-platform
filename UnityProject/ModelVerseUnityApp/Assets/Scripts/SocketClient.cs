using UnityEngine;
using SocketIOClient;
using System.Threading.Tasks;

public class SocketClient : MonoBehaviour
{
    private SocketIO client;

    async void Start()
    {
        UnityEngine.Debug.Log("🔌 SocketClient started");

        client = new SocketIO("http://localhost:3001", new SocketIOOptions
        {
            Transport = SocketIOClient.Transport.TransportProtocol.WebSocket
        });

        client.OnConnected += (sender, e) =>
        {
            UnityEngine.Debug.Log("✅ Connected to WebSocket server");
        };

        client.OnDisconnected += (sender, e) =>
        {
            UnityEngine.Debug.Log("❌ Disconnected from WebSocket server");
        };

        // Test ping
        client.On("hello", response =>
        {
            UnityEngine.Debug.Log("👋 Hello: " + response.GetValue<string>());
        });

        // 👇 Escuchar el evento emitido desde el backend
        client.On("modelUpdated", response =>
        {
            var json = response.GetValue().ToString();
            UnityEngine.Debug.Log("🆕 Model update received: " + json);
        });

        try
        {
            await client.ConnectAsync();
        }
        catch (System.Exception ex)
        {
            UnityEngine.Debug.LogError("❗ Connection error: " + ex.Message);
        }
    }
}
