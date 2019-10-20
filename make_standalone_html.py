from pathlib import Path

'''
This script creates a new html that has placed the javascript code inline to make a standalone html
'''


src = Path.cwd() / 'coldcard_address_generator_html.html'
dest = Path.cwd() / 'coldcard_address_generator_html_standalone.html'
dest2 = Path.cwd() / 'index.html'  # for github pages


string = '<script src="js/coldcard_address_generator_html.js"></script>'


def main():

    with open(src) as s:
        source = s.readlines()

    source = replace(source, '<script src="js/coldcard_address_generator_html.js"></script>', Path.cwd() / 'js' / 'coldcard_address_generator_html.js')
    source = replace(source, '<script type="module" src="js/bip32.js"></script>', Path.cwd() / 'js' / 'bip32.js')
    source = replace(source, '<script type="module" src="js/bitcoinjs-lib.js"></script>', Path.cwd() / 'js' / 'bitcoinjs-lib.js')

    with open(dest, 'w') as d:
        for line in source:
            d.write(line)

    with open(dest2, 'w') as d:
        for line in source:
            d.write(line)




def replace(string_arr, find_str, replacement_file):
    out = []

    with open(replacement_file) as r:
        rep = r.read()

    for line in string_arr:
        if find_str in line:
            out.append('<script>' + rep + '</script>\n')
            print()
        else:
            out.append(line)

    return out


if __name__ == '__main__':
    main()
