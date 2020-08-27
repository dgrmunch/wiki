# Electroencephalography (EEG) notes

tags: neuroscience, cognitive science, eeg-notes, embodied cognition, eeg, research, neurophenomenology, philosophy of mind, experiments, brain, situated, sciart, virtual reality, brain waves, erp, notes, single-subject research, science, R

# Arriving to neuroscience

My philosophical view about the mind is both science-based and phenomenologically-oriented. I strongly believe in a bidirectional approach to truly understand human experience (philosophy of mind should be guided by science, but also the other way around). 

My first-person explorations in [neurophenomenology](#!tags/neurophenomenology.md)  are guided by the conjunction of low-cost EEG and DIY neuroscience. I love exploring the field of cognitive science by reading academic bibliography, but I find my self specially satisfied while executing self-guided phenomenological and neuroscience projects, in order to test or verify any hypothesis on my own.

I did not study neuroscience as an undergrad. Actually, my first incursion in this field did not take place until 2013, when I started collaborating with the **Cognitive Neuroscience Center** at the **UCM-ISCIII for Human Evolution and Behavior**.

At the time I had a strong background in Computer Science, Artificial Intelligence and Systems Biology, but I really wanted to learn more in detail about Neuroscience. Affordable MOOCs were a good resource to get into the field and Coursera and EdX were already available. So I invested my short free time studying online courses from Duke University, MIT or the Hebrew University of Jerusalem. 

I was working full time for an IT company and volunteering some hours for the Cognitive Neuroscience Center. Usually, once a week, I met with Manuel Martín-Loeches and learnt about neuroscience and EEG. Thanks to Manuel I could have an initial approach to software like SPM, Presentation or EEGLAB, a cool interactive Matlab toolbox for continuous and event-related EEG developed by the University of California at San Diego. I also studied the lab's ERP data, read research papers and got immersed in neuroscience books while enjoying the background noise of coffee shops.

After that I had a research stay in a making lab in the University of Toronto, I got a PhD in Information Science (mostly about the simulation of complex and self-organized systems, but also with some cognitive science) and moved to the US for some years. I could not continue with the **Cognitive Neuroscience Center** at the **UCM-ISCIII for Human Evolution and Behavior**. However, I kept studying neuroscience. 

DIY neuroscience is today one of my passions and part of my current research. Some of the notes about this topic are in here or linked somehow under the same tags that this article.


## Affordable hardware and DIY electronics in Low Cost EEG 

For some time I thought about buying EEG hardware in order to do some [neuroscience](#!tags/neuroscience.md) research for the [SciArt Lab](http://sciartlab.com).

One of the goals was to use it for live experiments during our STEAM educational events, exploring neuroscience within the context of VR or artistic production. But I was particularly interested in [single-subject research](#!tags/single-subject research.md) and the potential of correlating phenomenological investigations with its neurophysiological correlates. In other words, to perform DIY experiments with a [neurophenomenological](#!tags/neurophenomenology.md) approach and (important) with a low budget.

The possibility of getting an affordable neuroscience equipment was remote. 
The lab did not have a lot of money, so I just decided to explore DIY electronics, buy a kit for one channel EEG, pay it from my pocket and learn how to make it work with my Arduino and my Raspberry Pi.

Our new equipment would allow us to extract raw data from situated/embodied experiences, giving us the possibility of correlating sensory stimuli  with neural activity (see [ERP](#!tags/erp.md)s and [brain waves](#!tags/brain waves.md)) within the context of both SciArt and [single-subject research](#!tags/single-subject research.md) experiments.

The use of neuroscience to *naturalize* [phenomenological](#!tags/neurophenomenology.md) descriptions within a more analytical framework with actual brain data was a potential tool. Additionally, the fact of using low cost electronics to implement small cognitive neuroscience setups, easy to carry, was crucial to perform *out-of-the-lab* experiments, capturing data about situations in which embodiment and immersion are crucial, providing a valuable tool to study [situated cognition](#!tags/situated.md).

The whole point was getting the most basic hardware and combine it with my amateur neuroscience knowledge, my experience with Arduino and DIY electronics, and my skills as a Software Engineer. 


## Backyard Brains and DIY Neuroscience

I remember that some years ago, I was walking with my wife through campus of the *University of Michigan* in Ann Arbor. We were sharing deep thoughts and engaged in a conversation about our life and our future research, discussing the potential possibilities of the [Sciart Lab](http://sciartlab.com), what at that time was just in its first steps. 

It was raining but we kept walking and talking. Eventually, we found a sticker on one wall about *Backyard Brains*, an biotech company born in Ann Arbor. It was co-founded by Greg Gage, currently Adjunct Professor in the Department of Molecular & Integrative Physiology at the University of Michigan, and Timothy Marzullo, the current Chief Scientific Officer of the company, who also got his PhD in Neuroscience in town.

The sticker triggered some memories about a fascinating talk I watched time before, in which they showed how to remotely control a cockroach by using low-cost electronics and easy-to-use software for *DIY neuroscience*.

At the end, Backyard Brains was bringing the "making/hacking" mindset to a field traditionally restrained to academic or medical institutions. That was fascinating and I thought that, one day, we would talk to them and test some of their hardware.

Some years after that, I ordered my first kit from BB! Even though this implied thinking about dramatically reducing the number of channels (if compared with professional equipment), this limitation was obviously a motivation. At the end, single-channel EEG can also be interesting, right?

> The general feeling in the research community is not a lot but more and more people are betting on “more data” over “good data”. Consumer grade products already exist such as Neurosky the original single channel system) and Muse and Melon (3-4 electrodes as far as I can tell). With these devices the emphasis is on making it easy to use and cheap enough for consumer apps and I think there is a lot of value in this (it will drive down costs) but the most interesting (and perhaps controversial) example is the iBrain form NeuroVigil. Founder Philip Low claims to be able to classify brain states and responses with a single channel that other groups have been struggling with using dense EEG arrays for many years. The work is based on his PhD which recently became public after a long patent related embargo and appears to be a simple classification of states based on the most prevalent frequency band in a normalised spectrum for a given epoch (using epochs of 30s). What’s interesting is that the classification is in temporal space although the feature is in frequency space. 

> Ref: https://www.neuroelectrics.com/blog/2014/12/18/single-channel-eeg/


## Useful resources

### Single-channel EEG

* Philip Low's PhD thesis: https://escholarship.org/uc/item/6250v3wk
* https://www.neurovigil.com

### EEG 

* Introduction to Cognitive Neuroscience MIT: https://ocw.mit.edu/high-school/biology/introduction-to-cognitive-neuroscience/video-lectures/lecture-1/
* Awesome BCI Resources: https://github.com/NeuroTechX/awesome-bci
* EEG Notebooks by NeuroTechX: https://eeg-notebooks.readthedocs.io/en/latest/index.html

### Brain hacking / neurohackers

* https://github.com/NeuroTechX/awesome-bci
* http://fab.cba.mit.edu/classes/863.15/section.Harvard/people/Ricker/htm/Final_Project.html
* http://www.neuroeducate.com/about-us.html
* http://learn.neurotechedu.com/contributors/
* https://www.gwern.net/Zeo#zeo-qs (zeo sleep self-experiment)


### Signal processing

* Wav to EDF? 
    * https://en.wikipedia.org/wiki/European_Data_Format
    * https://www.teuniz.net/edfbrowser/
    * https://www.edfplus.info/downloads/index.html

* R packages: https://rdrr.io/find/?repos=cran%2Cbioc%2Crforge%2Cgithub&fuzzy_slug=eeg
    * https://rdrr.io/cran/eegkit/
    * https://rdrr.io/cran/eegAnalysis/
    * https://rdrr.io/github/TKoscik/eegr/man/eegr-package.html

* https://stackoverflow.com/questions/7105962/how-do-i-run-a-high-pass-or-low-pass-filter-on-data-points-in-r
* R Signal package: https://cran.r-project.org/web/packages/signal/signal.pdf
https://rdrr.io/rforge/dplR/man/pass.filt.html


### More info:

* See [ERP notes](erp-notes.md)
* See notes, concepts and articles tagged as [eeg](#!tags/eeg.md)

