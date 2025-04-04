# Usa imagem Python como base
FROM python:3.10

# Cria diretório no container
WORKDIR /app

# Copia arquivos do projeto para o container
COPY . .

# Instala dependências (ajuste se usar requirements.txt ou pipenv)
RUN pip install -r requirements.txt

# Expõe a porta (ajuste se precisar)
EXPOSE 5000

# Comando para rodar a aplicação (ajuste conforme seu app)
CMD ["python", "api/index.py"]
