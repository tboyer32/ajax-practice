import random

from flask import Flask, request, render_template, jsonify

app = Flask(__name__)


@app.route('/')
def index():
    """Show index page."""
    
    return render_template("index.html")


@app.route('/api/profile', methods=['POST'])
def profile():
    """Return results from profile form."""

    form_dict = {}

    form_dict['fullname'] = request.json['name']
    form_dict['age'] = request.json['age']
    form_dict['occupation'] = request.json['occupation']
    form_dict['salary'] = request.json['salary']
    form_dict['education'] = request.json['salary']
    form_dict['state'] = request.json['state']
    form_dict['garden'] = request.json['garden']
    form_dict['tv'] = request.json['tv']
    

    if 'rural' in request.json.keys():
        form_dict['rural'] = 'rural'
    if 'suburban' in request.json.keys():
        form_dict['suburban'] = 'suburban'
    if 'urban' in request.json.keys():
        form_dict['urban'] = 'urban'
    
    # return jsonify({'fullname': fullname, 'age' : age, 'occupation' : occupation,
    # 'salary': salary, 'education': education, 'state': state, 'garden': garden, 'tv': tv})

    return jsonify(form_dict)




if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
