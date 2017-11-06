lista=[1,2,3,4,5,5,3,2,4,5]

print(lista)

contador = 0
count = 0
numero = int(input("Ingrese un numero"))

while (contador<len(lista)):
	if lista[contador]==numero:
		count = count +1
	contador = contador +1;

print(count)