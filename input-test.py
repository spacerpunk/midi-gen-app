import mido

inputs = mido.get_input_names()
outputs = mido.get_output_names()

print('inputs: ', inputs)
print('outputs: ', outputs)

# # select a MIDI input port by name
# input_port = mido.open_input('Keystation 88 1')

# # loop to receive MIDI messages
# for message in input_port:
#     print(message.velocity)
