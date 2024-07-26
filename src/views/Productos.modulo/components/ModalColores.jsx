import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure  ,Checkbox , CheckboxGroup} from "@nextui-org/react";
import {Colores} from "./DataColores"


export const ModalColores = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} color="primary">Colores</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} size="4xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 ">Colores</ModalHeader>
              <ModalBody>
              <CheckboxGroup>
              <div className="grid sm:grid-cols-6 gap-10 grid-cols-3">
                  {Colores.map((color, index) => (
                    <label key={index} className="flex flex-col items-center border-2 border-gray-300 px-3 pt-3 rounded-2xl" >
                      <div className="flex">
                      <div
                        className="w-8 h-8 rounded-full"
                        style={{ backgroundColor: color.color }}
                      ></div>
                      <Checkbox type="checkbox" className="ml-5" value={color.color} />
                      </div>
                      <span>{color.label}</span>
                    </label>
                  ))}
                </div>
              </CheckboxGroup>
         
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="primary" onPress={onClose}>
                  Enviar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

