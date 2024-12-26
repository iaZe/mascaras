# Adicção de mascaras

> Esse é um script para adição de mascaras em inputs no HTML, ele consegue adicionar mascaras em elementos que são preenchidos pelo backend no momento do load da página (no caso do Django, formulários que possuem instancias), porém ele ainda precisa de uma sanitização no back-end pois ele envia os dados com a mascara

### Ajustes e melhorias

- [x] Adicionar mascaras aos campos
- [x] Adicionar mascaras em campos preenchidos
- [x] Correção na posição do cursor
- [x] Fluidez para evitar inversão de caracteres ao adicionar ou apagar
- [ ] Remover as mascaras antes de enviar o formulário (está enviando os dados com as máscaras)
      
## ☕ Para usar

Para usar as mascaras, adicione o ID referente a mascara no input

```
  <input type="text" name="telefone" class="form-control" id="telefone">
```

Adicione a mascara ao Evento DOM caso ela não exista

```
    const cpfInput = document.getElementById('CPF');

    if (cpfInput) {
        aplicarMascara(cpfInput, '###.###.###-##');
    }
```
