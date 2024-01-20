namespace KanbanSystem.Utils
{
    public class JwtToken
    {
        public string Key { get; set; } // chave de segurança.

        public string Issuer { get; set; } // quem está emitindo o token.

        public string Audience { get; set; } // destinatário do token.

        public long ExpireMin { get; set; } // quanto tempo o token será valido em minutos.

    }
}
