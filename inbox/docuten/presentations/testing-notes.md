---
marp: true
theme : uncover
_class: invert

---


## Effective Unit Testing
A book by Lasse Koskela
A review by Diego González 😉


---


The promise of good tests 
<br>

![](testing-notes-images/handshake-flat.png)


---
<!-- 
_class : invert
-->

Tests improve productivity

<br>

![](testing-notes-images/coffee-takeaway-flat-128x128.png) ![](testing-notes-images/dollar-flat-128x128.png) ![](testing-notes-images/medal-flat-128x128.png)

---

<!-- 
_class : invert
-->

Tests decrease the amount of future bugs
<br>
![](testing-notes-images/eye-flat-128x128.png)
<br>
[They watch the code for you]

---
<!-- 
_backgroundColor: white
-->

![](testing-notes-images/effortTests.png)
> The more tests we have,
the less value an additional test is likely
to yield.

---

<!-- 
_backgroundColor: white
-->


![](testing-notes-images/twoPlateaus.png)


> The biggest value of writing a test lies not in the resulting  test but in what we learn from writing it.
---

<!-- 
_class : invert
-->
# Cool! So...

 The point is that we can (and should) use tests as a **design tool**
 <br>

![](testing-notes-images/document-edit-flat-128x128.png)

---



> BDD **Mantra**

Check for behavior. Not implementation 
<br>
![](testing-notes-images/beer-flat-128x128.png)

---

> 
![](testing-notes-images/testing5.png)

---



```
import spock.lang.Specification

class DocuTeamSpec extends Specification {

    def "it should verify the number of hands of our team"() {
        
		given: "Docuten has 9 people in the IT team"
		    
                    def i = 9

		when: "Each member has 2 hands"

		    i = i * 2

		then: "The expected number of hands to code is 18"
    
                    assert i == 18
	}
}
```
---


<!-- 
_class : invert
-->

 ### Test Doubles

<br>

![](testing-notes-images/person-flat.png)  ![](testing-notes-images/person-flat.png)

---

* Test doubles
	* Test stub
	* Fake object
	* Test spy
	* Mock object


---

<!-- 
_class : invert
-->


> Inject your dependencies



---

Images from https://freeiconshop.com and the aforementioned book :)