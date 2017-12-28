from flask import Flask, json, Response, render_template
app = Flask(__name__)

@app.route('/')
def index():
	return render_template('formulario.html')

@app.route('/procesar', methods = ['GET','POST'])
def procesar():
	return '''<h1>The language value is: </h1>'''
    
if __name__ == '__main__':
    app.run(debug=True, port=5000)