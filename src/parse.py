#!/usr/bin/env python3

file = open('./resources/tickers', 'r')

lines = file.readlines()
text = '{\n'
number = 0

for line in lines:
    index1 = line.index(',')
    ticker = line[0:index1]
    line2 = line[index1+1:]
    index2 = line2.index(',')
    name = line2[0:index2]
    sector = line2[index2+1:]
    text += '\t"' + str(number) + '": { \n\t\t "ticker": "' + ticker + '",\n\t\t "name": "' + name + '",\n\t\t "sector": "' + sector.strip() + '"\n\t},\n'
    number += 1

text += '}\n'
print(text)
file2 = open('./resources/tickers_json', 'w')
file2.write(text)
