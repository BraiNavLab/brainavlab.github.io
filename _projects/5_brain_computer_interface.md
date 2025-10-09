---
title: Brain Computer Interface

description: |
  This project advances Brain–Computer Interface (BCI) technologies through two complementary approaches. The active BCI focuses on decoding brain activity during motor imagery using EEG and deep learning methods to improve the translation of neural signals into real-time control commands for external devices. The passive BCI monitors mental states such as vigilance and workload to detect fatigue or inattention during prolonged tasks. Together, these systems enhance human–machine interaction and workplace safety by enabling adaptive interfaces that respond dynamically to the user’s cognitive state.

people:
  - silvia_francesca_storti
  - ettore_cinquetti
  - nicola_vale
  - ilaria_siviero

#image: XXX
#status: inactive
#link: XXX
layout: project
last-updated: 2022-09-02
image: ../img/projects_img/image_test.png
---

<h4>Active BCI</h4>
This project intends to fill the gap between the human brain and external devices in the framework of motor-imagery (MI)-based brain computer interfaces (BCIs) technologies. The BCI is a system able to read voluntary changes in brain activity and then translate neural signals into a message or a computational command in real-time. Among the various types of systems, a non-invasive BCI based on electroencephalography (EEG) and MI transforms neuroelectric signals derived from motor regions into command outputs for external effectors. The success of translating the signal in messages depends on several methodological contributing factors, i.e. decoding algorithms, calibrated on the motor regions using a suitable representation of the data that simplifies the classification or detection of specific brain patterns. The state-of-the-art devices provide good performance albeit limited, when few EEG electrodes are used, calling for novel approaches. In answer to this call, we propose a new method for extracting discriminative features allowing to distinguish different mental movements within a multivariate brain connectivity and deep learning framework. The system is trained to decode the brain activity during MI tasks using the coupling information or causal influence between signals and will produce corresponding signals to an interface that controls an external device.
<br>
<h4>Passive BCI</h4>
Passive BCI allows the monitoring of a subject’s mental state, without the need of any active input. It has applications in fields where operator mistakes may cause severe accidents, such as air traffic control, plant surveillance, or driving. It can also be applied in the manufactory context, specifically by monitoring an operator’s level of vigilance, which can be defined as the capacity to sustain one’s attention during the realization of a task, and their mental workload, that is the effort furnished to respond to the task's demands. Both vigilance and mental workload fluctuations can be observed over time by analyzing the EEG, since they are associated with specific behaviors. The goal of the project is to create a deep learning pipeline capable of monitoring an operator’s mental state in real-time, during the execution of prolonged activities. The model needs to alert operators by audio or video cues, should they become too tired to work without endangering themselves or the assembly procedure.
